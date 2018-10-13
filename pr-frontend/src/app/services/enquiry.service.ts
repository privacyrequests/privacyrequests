import { Injectable } from '@angular/core';
import { Enquirer } from '../models/enquirer';
import { EnquiryType } from '../models/enquiry-type';
import { EnquiryTypeEnum } from '../enums/enquiry-type.enum';
import { OptionalEnquiryTypeEnum } from '../enums/optional-enquiry-type.enum';
import { Subject } from 'rxjs';
import { Recipient } from '../models/recipient';
import { Enquiry } from '../models/enquiry';
import { Signature } from '../models/signature';
import { AnalogSignature } from '../models/analog-signature';
import { DigitalSignature } from '../models/digital-signature';
import { Email } from '../models/email';
import { EmailDeliveryReceipt } from '../models/email-delivery-receipt';
import { FileUploader } from 'ng2-file-upload';

@Injectable()
export class EnquiryService {
  enquiry: Enquiry = new Enquiry();

  emailDeliveryReceipt: EmailDeliveryReceipt = new EmailDeliveryReceipt();

  private enquirerSource = new Subject<Enquirer>();
  enquirer$ = this.enquirerSource.asObservable();

  private enquiryTypeSource = new Subject<EnquiryType<EnquiryTypeEnum>>();
  enquiryType$ = this.enquiryTypeSource.asObservable();
  
  private optionalEnquiryTypeSource = new Subject<Array<EnquiryType<OptionalEnquiryTypeEnum>>>();
  optionalEnquiryType$ = this.optionalEnquiryTypeSource.asObservable();

  private recipientsSource = new Subject<Array<Recipient>>();
  recipients$ = this.recipientsSource.asObservable();

  private signatureSource = new Subject<Signature>();
  signature$ = this.signatureSource.asObservable();

  private emailDeliveryReceiptSource = new Subject<EmailDeliveryReceipt>();
  emailDeliveryReceipt$ = this.emailDeliveryReceiptSource.asObservable();

  constructor() { }

  setEnquirer(enquirer: Enquirer) {
    this.enquirerSource.next(enquirer);
    this.enquiry.enquirer = enquirer;
  }

  setEnquiryType(enquiryType: EnquiryType<EnquiryTypeEnum>) {
    this.enquiryTypeSource.next(enquiryType);
    this.enquiry.enquiryType = enquiryType;
  }

  setOptionalEnquiryType(optionalQueryTypeArray: Array<EnquiryType<OptionalEnquiryTypeEnum>>) {
    this.optionalEnquiryTypeSource.next(optionalQueryTypeArray);
    this.enquiry.optionalEnquiryTypes = optionalQueryTypeArray;
  }

  setRecipients(recipients: Array<Recipient>) {
    this.recipientsSource.next(recipients);
    this.enquiry.recipients = recipients;
  }

  setAnalogSignature(signature: string, id: string) {
    let aSig = new AnalogSignature(signature, id);
    this.signatureSource.next(aSig);
    this.enquiry.signature = aSig;
  }

  setDigitalSignature(signature: string, preparedPdf: string, mac: string) {
    let dSig = new DigitalSignature(signature, preparedPdf, mac);
    this.signatureSource.next(dSig);
    this.enquiry.signature = dSig;
  }

  setEmail(email: Email) {
    this.enquiry.email = email;
  }

  setEmailDeliveryReceipt(emailDeliveryReceipt: EmailDeliveryReceipt) {
    this.emailDeliveryReceiptSource.next(emailDeliveryReceipt);
    this.emailDeliveryReceipt = emailDeliveryReceipt;
  }
}
