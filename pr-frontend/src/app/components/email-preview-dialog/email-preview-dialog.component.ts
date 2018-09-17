import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Enquiry } from '../../models/enquiry';
import { Recipient } from '../../models/recipient';
import { Enquirer } from '../../models/enquirer';
import { Email } from '../../models/email';

@Component({
	selector: 'email-preview-dialog',
	templateUrl: './email-preview-dialog.component.html',
	styleUrls: ['./email-preview-dialog.component.css']
})
export class EmailPreviewDialogComponent implements OnInit {
	
	@Input() enquiry: Enquiry;
	@Input() email: Email;
	recipientsText: string;

	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() {
		this.recipientsText = this.enquiry.recipients.map((recipient) => recipient.email).join("; ");
		this.email.body = this.email.body.replace("$name", this.enquiry.enquirer.firstName + " " + this.enquiry.enquirer.lastName);
	}

	saveEmail() {
		this.activeModal.close(this.email);
	}
}
