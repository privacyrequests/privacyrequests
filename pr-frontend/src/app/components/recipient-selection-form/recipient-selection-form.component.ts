import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipient } from '../../models/recipient';
import { EnquiryService } from '../../services/enquiry.service';
import { EnquiryHttpService } from '../../services/enquiry-http.service';
import { StepService } from '../../services/step.service';
import { Step } from '../../enums/step.enum';

@Component({
	selector: 'recipient-selection-form',
	templateUrl: './recipient-selection-form.component.html',
	styleUrls: ['./recipient-selection-form.component.css']
})
export class RecipientSelectionFormComponent implements OnInit {

	Step = Step;
	recipients: Array<Recipient> = new Array<Recipient>();
	recipientFilter = { name: '' };
	isAddRecipientHidden: boolean = true;
	addedRecipient = new Recipient();
	showError: boolean = false;
	showAlert: boolean = false;
	stayHidden: boolean = false;
	@ViewChild("additionalRecipientForm") additionalRecipientForm;

	constructor(private enquiryService:EnquiryService, private enquiryHttpService: EnquiryHttpService, private stepService: StepService) { 
		this.stepService.onNextChange().subscribe((step) => {
			if (this.stepService.getCurrentStep()-1 == Step.RecipientSelectionStep && this.recipients.filter(recipient => recipient.selected).length == 0) {
				this.showError = true;
				this.stepService.setStep(Step.RecipientSelectionStep);
			}
		});
	}

	ngOnInit() {
		this.enquiryHttpService.getRecipients().subscribe((result) => {
			this.recipients = result;
		});		
	}

	updateRecipients() {
		this.showError = false;
		this.enquiryService.setRecipients(this.recipients.filter(recipient => recipient.selected));
	}

	selectRecipient(recipient: Recipient) {
		recipient.selected = !recipient.selected; 
		if (this.recipients.filter(recipient => recipient.selected).length > 50) {
			recipient.selected = false;
		}
		if (this.recipients.filter(recipient => recipient.selected).length > 1 && !this.stayHidden) {
			this.showAlert = true;
		} else {
			this.showAlert = false;
		}

		this.updateRecipients();
	}

	addRecipient() {
		if (this.additionalRecipientForm.invalid) {
			this.validateForm();
		} else {		
			this.addedRecipient.selected = true;
			this.recipients.unshift(this.addedRecipient);
			this.addedRecipient = new Recipient();
			this.updateRecipients();
			this.additionalRecipientForm.reset();
		}
	}

	private validateForm() {
		Object.keys(this.additionalRecipientForm.controls).forEach(field => {
			const control = this.additionalRecipientForm.controls[field];           
			control.markAsTouched();
		});
	}
}	