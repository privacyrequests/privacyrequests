export class EnquiryType<T> {
	type: T;
	additionalText: string = "";

	constructor(type: T) {
		this.type = type;
	}
}
