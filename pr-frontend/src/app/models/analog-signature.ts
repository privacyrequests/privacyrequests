import { Signature } from './signature';

export class AnalogSignature implements Signature {
	signatureDataURL: string;
	idDataURL: string;

	constructor(signatureDataURL: string, idDataURL: string) {
		this.signatureDataURL = signatureDataURL;
		this.idDataURL = idDataURL;
	}
}
