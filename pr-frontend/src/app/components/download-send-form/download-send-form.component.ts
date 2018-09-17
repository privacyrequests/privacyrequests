import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../../services/enquiry.service';
import { DigitalSignature } from '../../models/digital-signature';

@Component({
	selector: 'download-send-form',
	templateUrl: './download-send-form.component.html',
	styleUrls: ['./download-send-form.component.css']
})
export class DownloadSendFormComponent implements OnInit {

	isDigitallySigned: boolean = false; //Client Side only check

	constructor(private enquiryService: EnquiryService) { }

	ngOnInit() {
		this.enquiryService.signature$.subscribe(
			signature => {
				if (signature instanceof DigitalSignature) {
					this.isDigitallySigned = true;
				}
			}
		);
	}
}
