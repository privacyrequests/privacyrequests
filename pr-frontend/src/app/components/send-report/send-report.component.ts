import { Component, OnInit } from '@angular/core';
import { EnquiryHttpService } from '../../services/enquiry-http.service';
import { EmailDeliveryReceipt } from '../../models/email-delivery-receipt';

@Component({
	selector: 'send-report',
	templateUrl: './send-report.component.html',
	styleUrls: ['./send-report.component.css']
})
export class SendReportComponent implements OnInit {

	showEmailDetails: boolean = false;
	passphrase: string = "";
	emailDeliveryReceipt: EmailDeliveryReceipt = new EmailDeliveryReceipt();
	hasError = false;

	constructor(private enquiryHttpService: EnquiryHttpService) { }

	ngOnInit() {

	}

	changeHandler() {
		if (this.passphrase.length > 10) {
			this.enquiryHttpService.getEmailDeliveryReceipt(this.passphrase).subscribe(
				(result) => {
					this.emailDeliveryReceipt.emailDetails = result;
					this.showEmailDetails = true;
					this.hasError = false;
				}, (error) => {
					this.hasError = true;
				}
				);
		} else {
			this.hasError = false;
			this.showEmailDetails = false;
			this.emailDeliveryReceipt = new EmailDeliveryReceipt();
		}

	}

}
