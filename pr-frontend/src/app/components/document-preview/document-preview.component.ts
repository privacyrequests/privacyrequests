import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Enquirer } from '../../models/enquirer';
import { EnquiryType } from '../../models/enquiry-type';
import { EnquiryTypeEnum } from '../../enums/enquiry-type.enum';
import { OptionalEnquiryTypeEnum } from '../../enums/optional-enquiry-type.enum';
import { EnquiryService } from '../../services/enquiry.service';
import { Recipient } from '../../models/recipient';
import { AnalogSignature } from '../../models/analog-signature';
import { DigitalSignature } from '../../models/digital-signature';

@Component({
  selector: 'document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit {
  EnquiryTypeEnum = EnquiryTypeEnum;
  OptionalEnquiryTypeEnum = OptionalEnquiryTypeEnum;
  enquirer: Enquirer = new Enquirer();
  enquiryType = new EnquiryType<EnquiryTypeEnum>(EnquiryTypeEnum.AllData);
  optionalEnquiryType = new Array<EnquiryType<OptionalEnquiryTypeEnum>>();
  recipients = new Array<Recipient>();
  index: number = 0;
  today: number = Date.now();
  signatureURL: string;
  resizeSignature: boolean;
  isDigitallySigned: boolean = false;

  constructor(private enquiryService:EnquiryService) { 
    this.enquiryType.type = EnquiryTypeEnum.AllData;
  }

  isToggled(optionalEnquiryTypeEnum: OptionalEnquiryTypeEnum) {
    return this.getOptionalEnquiryType(optionalEnquiryTypeEnum) != null;
  }

  getOptionalEnquiryType(optionalEnquiryTypeEnum: OptionalEnquiryTypeEnum) {
    return this.optionalEnquiryType.find(oet => oet.type == optionalEnquiryTypeEnum);
  }

  nextRecipient() {
    if (this.index < this.recipients.length-1) {
      this.index++;
    }
  }

  previousRecipient() {
    if (this.index > 0) {
      this.index--;
    }
  }

  ngOnInit() {  	
  	this.enquiryService.enquirer$.subscribe(
  		enquirer => {
  			this.enquirer = enquirer;
  	});
    this.enquiryService.enquiryType$.subscribe(
      enquiryType => {
        this.enquiryType = enquiryType;
    });
    this.enquiryService.optionalEnquiryType$.subscribe(
      optionalEnquiryType => {
        this.optionalEnquiryType = optionalEnquiryType
    });
    this.enquiryService.recipients$.subscribe(
      recipients => {
        this.recipients = recipients;
        if (this.index != 0 && this.index == this.recipients.length) {
          this.index--;
        }
    });
    this.enquiryService.signature$.subscribe(
      signature => {
        if (signature instanceof DigitalSignature) {
          this.isDigitallySigned = true;
        } else {
          this.signatureURL = (<AnalogSignature> signature).signatureDataURL;
        }
    });
  }
  
}
