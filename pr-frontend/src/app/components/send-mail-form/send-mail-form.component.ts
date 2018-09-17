import { Component, OnInit } from '@angular/core';
import { Recipient } from '../../models/recipient';
import { EnquiryService } from '../../services/enquiry.service';
import { EnquiryHttpService } from '../../services/enquiry-http.service';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EmailPreviewDialogComponent } from '../email-preview-dialog/email-preview-dialog.component';
import { Email } from '../../models/email';
import { EmailDeliveryReceipt } from '../../models/email-delivery-receipt';
import { StepService } from '../../services/step.service';
import { Step } from '../../enums/step.enum';
import {Router} from "@angular/router";

@Component({
	selector: 'send-mail-form',
	templateUrl: './send-mail-form.component.html',
	styleUrls: ['./send-mail-form.component.css']
})
export class SendMailFormComponent implements OnInit {

	recipients: Array<Recipient>;
	ngbModalOptions: NgbModalOptions = {
		backdrop: 'static',
		keyboard: false
	};
	email: Email = new Email();
	editedMail: boolean = false;
	loading: boolean = false;
	
	constructor(private enquiryService: EnquiryService, private enquiryHttpService: EnquiryHttpService, private modalService: NgbModal, private stepService: StepService, private router: Router) { }

	ngOnInit() {
		this.enquiryService.recipients$.subscribe(
			recipients => {
				this.recipients = recipients;
			}
		);
	}

	sendEmail() {
		this.loading = true;
		this.enquiryHttpService.sendEmail(this.enquiryService.enquiry).subscribe(
			(result: EmailDeliveryReceipt) => {
				this.enquiryService.setEmailDeliveryReceipt(result);
				this.router.navigate(['erfolgreich']);
				this.loading = false;
			}, (error) => {

			}
		);
	}

	previewEmail() {
		const emailPreviewDialog = this.modalService.open(EmailPreviewDialogComponent, this.ngbModalOptions)
		emailPreviewDialog.componentInstance.enquiry = this.enquiryService.enquiry;
		emailPreviewDialog.componentInstance.email = this.email;

		emailPreviewDialog.result.then(
			(result) => {
				this.email = result;
				this.enquiryService.setEmail(result);
				this.editedMail = true;
			}, (reason) => {
				if (reason == "Cancel") {

				}
			}
		);
	}
}
