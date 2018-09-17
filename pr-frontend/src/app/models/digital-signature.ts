import { Signature } from './signature';

export class DigitalSignature implements Signature {
	digitalSignature: string;
	preparedPdf: string; // Base64 encoded PDF with empty /Content
	mac: string; //Message Authentication Code

	constructor(digitalSignature: string, preparedPdf: string, mac: string) {
		this.digitalSignature = digitalSignature;
		this.preparedPdf = preparedPdf;
		this.mac = mac;
	}
}
