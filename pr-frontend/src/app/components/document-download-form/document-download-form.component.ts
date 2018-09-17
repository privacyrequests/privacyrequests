import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../../services/enquiry.service';
import { EnquiryHttpService } from '../../services/enquiry-http.service';
import { AnalogSignature } from '../../models/analog-signature';
import { DigitalSignature } from '../../models/digital-signature';
import { DocumentType } from '../../enums/document-type.enum';

@Component({
	selector: 'document-download-form',
	templateUrl: './document-download-form.component.html',
	styleUrls: ['./document-download-form.component.css']
})
export class DocumentDownloadFormComponent implements OnInit {
	DocumentType = DocumentType;
	isDigitallySigned: boolean = false;
	idUploaded: boolean = false;
	signed: boolean = false;

	constructor(private enquiryService: EnquiryService, private enquiryHttpService: EnquiryHttpService) { }

	ngOnInit() {
		this.enquiryService.signature$.subscribe(
			signature => {
				this.isDigitallySigned = (signature instanceof DigitalSignature);
				if (!this.isDigitallySigned) {
					this.signed = (<AnalogSignature> signature).signatureDataURL != null;
					this.idUploaded = (<AnalogSignature> signature).idDataURL != null;
				}
			});
	}

	download(documentType: DocumentType) {
		this.enquiryHttpService.download(documentType, this.enquiryService.enquiry);
	}

}
