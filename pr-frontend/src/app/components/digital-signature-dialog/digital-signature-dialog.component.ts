import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DigitalSignature } from '../../models/digital-signature';
import { EnquiryHttpService } from '../../services/enquiry-http.service';
import { Enquiry } from '../../models/enquiry';

@Component({
  selector: 'digital-signature-dialog',
  templateUrl: './digital-signature-dialog.component.html',
  styleUrls: ['./digital-signature-dialog.component.css']
})
export class DigitalSignatureDialogComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public enquiryHttpService: EnquiryHttpService) { }

  ngOnInit() {
  	
  }

}
