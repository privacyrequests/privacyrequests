import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Enquirer } from '../../models/enquirer';
import { EnquiryService } from '../../services/enquiry.service';
import { StepService } from '../../services/step.service';
import { Step } from '../../enums/step.enum';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'enquirer-details-form',
	templateUrl: './enquirer-details-form.component.html',
	styleUrls: ['./enquirer-details-form.component.css'],
})
export class EnquirerDetailsFormComponent implements OnInit {

	@ViewChild("enquirerForm") enquirerForm;
	Step = Step;
	enquirer: Enquirer = new Enquirer();
	environment = environment;
	legalCheckbox = false;
	
	ngOnInit() { }

	constructor(private enquiryService: EnquiryService, private stepService: StepService) {
		this.stepService.onNextChange().subscribe((step) => {
			if (this.enquirerForm.invalid) {
				this.validateForm();
				this.stepService.setStep(Step.EnquirerDetailsStep);
			}
		});
	}

	changeHandler() {
		this.enquiryService.setEnquirer(this.enquirer);
	}

	private validateForm() {
		Object.keys(this.enquirerForm.controls).forEach(field => {
			const control = this.enquirerForm.controls[field];           
			control.markAsTouched();
		});
	}

}
