import { Component, Input, ViewChild } from '@angular/core';
import { Step } from './enums/step.enum';
import { StepService } from './services/step.service';
import { EnquiryService } from './services/enquiry.service';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	environment = environment;
	isCollapsed = true;
	isCountryCollapsed = true;

	constructor() {
	}

	isLinkActive(url: string): boolean {
		return location.pathname == url;
	}
}
