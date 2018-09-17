import { Component, Input, ViewChild } from '@angular/core';
import { Step } from '../../enums/step.enum';
import { StepService } from '../../services/step.service';
import { EnquiryService } from '../../services/enquiry.service';
import { HostListener } from '@angular/core';
import { SignatureType } from '../../enums/signature-type.enum';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EmailReceiptDialogComponent } from '../../components/email-receipt-dialog/email-receipt-dialog.component';
import { HelpDialogComponent } from '../../components/help-dialog/help-dialog.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  title = 'PrivacyRequests';
  Step = Step;

  constructor(public stepService: StepService, private modalService: NgbModal) {

  }

  openEmailReceiptDialog() {
  	this.modalService.open(EmailReceiptDialogComponent);
  }

  openHelpDialog() {
    const helpDialog = this.modalService.open(HelpDialogComponent);
    helpDialog.componentInstance.step = this.stepService.getStepEnum();
    helpDialog.componentInstance.header = this.stepService.getStepText();
  }
}
