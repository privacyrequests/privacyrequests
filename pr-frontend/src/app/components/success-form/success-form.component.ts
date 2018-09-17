import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../../services/enquiry.service';
import { EmailDeliveryReceipt } from '../../models/email-delivery-receipt';
import { StepService } from '../../services/step.service';
import { Step } from '../../enums/step.enum';

@Component({
	selector: 'success-form',
	templateUrl: './success-form.component.html',
	styleUrls: ['./success-form.component.css']
})
export class SuccessFormComponent implements OnInit {

	emailDeliveryReceipt: EmailDeliveryReceipt = new EmailDeliveryReceipt();
	showEmailDetails = false;

	constructor(private enquiryService: EnquiryService, private stepService: StepService) { }

	ngOnInit() {
		this.stepService.setStep(Step.EnquirerDetailsStep);
		this.emailDeliveryReceipt = this.enquiryService.emailDeliveryReceipt;
	}

}
