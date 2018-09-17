import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailDeliveryReceipt } from '../../models/email-delivery-receipt';
import { EnquiryHttpService } from '../../services/enquiry-http.service';

@Component({
	selector: 'email-receipt-dialog',
	templateUrl: './email-receipt-dialog.component.html',
	styleUrls: ['./email-receipt-dialog.component.css']
})
export class EmailReceiptDialogComponent implements OnInit {

	emailDeliveryReceipt: EmailDeliveryReceipt = new EmailDeliveryReceipt();
	showEmailDetails = false;
	hasError = false;
	passphrase: string = "";

	constructor(public activeModal: NgbActiveModal, private enquiryHttpService: EnquiryHttpService) { }

	ngOnInit() {

	}

	checkPassphrase() {
		this.enquiryHttpService.getEmailDeliveryReceipt(this.passphrase).subscribe(
			(result) => {
				this.emailDeliveryReceipt.emailDetails = result;
				this.showEmailDetails = true;
				this.hasError = false;
			}, (error) => {
				this.hasError = true;
			}
		);
	}

}
