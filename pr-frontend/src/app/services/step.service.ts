import { Injectable } from '@angular/core';
import { Step } from '../enums/step.enum';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StepService {

	Step = Step;
	private currentStep: Step = Step.EnquirerDetailsStep;
	private nextStepSubject = new Subject<Step>();

	constructor() { }

	onNextChange() {
		return this.nextStepSubject.asObservable();
	}

	getCurrentStep() { return this.currentStep; }

	nextStep() {
		if (this.currentStep != this.getMaxStep()) {
			this.currentStep++;
			this.nextStepSubject.next(this.currentStep);
		}
	}

	previousStep() {
		if (this.currentStep > 1) {
			this.currentStep--;
		}
	}

	setStep(step: Step) {
		this.currentStep = step;
	}

	getMinStep() {
		return 1;
	}

	getMaxStep() {
		return 5;
	}

	getStepEnum(): string {
		return this.Step[this.currentStep];
	}

	getStepText() {
		switch(this.currentStep) { 
			case Step.EnquirerDetailsStep: { 
				return "Persönliche Daten";
			} 
			case Step.EnquiryDetailsStep: { 
				return "Auskunftsbegehren";
			}
			case Step.RecipientSelectionStep: { 
				return "Empfänger";
			}
			case Step.IdentityProofStep: { 
				return "Identitätsnachweis";
			}
			case Step.DownloadOrSendDocumentStep: {
				return "Download";
			}
		}
	}
}
