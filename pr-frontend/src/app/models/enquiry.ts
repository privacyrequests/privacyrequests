import { Enquirer } from './enquirer';
import { EnquiryType } from './enquiry-type';
import { EnquiryTypeEnum } from '../enums/enquiry-type.enum';
import { OptionalEnquiryTypeEnum } from '../enums/optional-enquiry-type.enum';
import { Recipient } from './recipient';
import { Signature } from './signature';
import { Email } from './email';

export class Enquiry {
	enquirer: Enquirer;
	enquiryType: EnquiryType<EnquiryTypeEnum>;
	optionalEnquiryTypes: Array<EnquiryType<OptionalEnquiryTypeEnum>>;
	recipients: Array<Recipient>;
	signature: Signature;
	email: Email;
}
