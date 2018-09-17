import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SignaturePadDialogComponent } from '../signature-pad-dialog/signature-pad-dialog.component';
import { DigitalSignatureDialogComponent } from '../digital-signature-dialog/digital-signature-dialog.component';
import { EnquiryService } from '../../services/enquiry.service';
import { EnquiryHttpService } from '../../services/enquiry-http.service';
import { SignatureType } from '../../enums/signature-type.enum';
import { StepService } from '../../services/step.service';
import { Step } from '../../enums/step.enum';
import { DigitalSignature } from '../../models/digital-signature';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'identity-proof-form',
  templateUrl: './identity-proof-form.component.html',
  styleUrls: ['./identity-proof-form.component.css']
})
export class IdentityProofFormComponent implements OnInit {

  @ViewChild('fileInput') fileInput: any;
  tooManyRecipients = false;
  public ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg'];
  public uploader:FileUploader = new FileUploader({
    allowedMimeType: this.ALLOWED_MIME_TYPES
  });
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };

  constructor(private modalService: NgbModal, private enquiryService:EnquiryService, private enquiryHttpService:EnquiryHttpService, private stepService:StepService) { }

  ngOnInit() {
    this.enquiryService.recipients$.subscribe((recipients) => {
      if (recipients.length > 1) {
        this.tooManyRecipients = true;
      } else {
        this.tooManyRecipients = false;
      }
    });
  }

  onFileLoaded(e: any) {
    this.modalService.open(SignaturePadDialogComponent, this.ngbModalOptions).result.then(
      (result) => {
        this.enquiryService.setAnalogSignature(result, e.target.result);
        this.stepService.setStep(Step.DownloadOrSendDocumentStep);
      }, (reason) => {
        if (reason == "Cancel") {
          //TODO: Clear queue
          this.fileInput.nativeElement.value = '';
        }
      });
  }

  handleFileSelect(event) {
    let reader = new FileReader();
    reader.onload = this.onFileLoaded.bind(this);
    reader.readAsDataURL(event.target.files[0]);
  }

  receiveMessage(event: MessageEvent, pdf: string, mac: string) {
    if (event.origin !== environment.signatureHandlerUrl) { 
      //Check that the Post Message comes from A-Trust
      return;
    }
    this.enquiryService.setDigitalSignature(event.data.signature, pdf, mac);
    return false;
  }

  handleDigitalSignature() {
    const digitalSignatureDialog = this.modalService.open(DigitalSignatureDialogComponent, this.ngbModalOptions);
    let popup;

    this.enquiryService.enquiry.signature = new DigitalSignature(null,null,null);

    digitalSignatureDialog.result.then(
      (result) => {
        this.stepService.setStep(Step.DownloadOrSendDocumentStep);
      }, (reason) => {
        if (reason == "Cancel") {
          //TODO: Implement Cancel Route
          popup.close();
        }
      });

    this.enquiryHttpService.getSignatureURL(this.enquiryService.enquiry).subscribe(
      (result) => {
            popup = window.open(result["url"], "", "width=600,height=400,left=375,top=250"); //TODO: Calculate Place Window in Center relative to Browser
            window.onmessage = (event: MessageEvent) => {
              this.receiveMessage(event, result["pdf"], result["mac"]);
            }

            let popupCheckLoop = setInterval(() => {   
              if (popup.closed) {  
                clearInterval(popupCheckLoop);
                if ((<DigitalSignature>this.enquiryService.enquiry.signature).digitalSignature != null)  {
                  this.stepService.setStep(Step.DownloadOrSendDocumentStep);  
                  digitalSignatureDialog.close();
                } else {
                  digitalSignatureDialog.dismiss('Cancel');
                }
              }  
            }, 500); 
          }, (error) => {

          });
  }
}