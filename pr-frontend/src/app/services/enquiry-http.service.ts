import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Enquiry } from '../models/enquiry';
import { Email } from '../models/email';
import { DocumentType } from '../enums/document-type.enum';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs';
import { Recipient } from '../models/recipient';
import { StatisticsData } from '../models/statistics-data';
import { EmailDeliveryReceipt } from '../models/email-delivery-receipt';
import { EmailDetails } from '../models/email-details';
import { environment } from '../../environments/environment';

@Injectable()
export class EnquiryHttpService {
	private HEADERS = new HttpHeaders();

	constructor(private http: HttpClient) { 
		this.HEADERS.set("Content-Type", "application/json");
	}

	getRecipients(): Observable<Recipient[]> {
		return this.http.get<Recipient[]>(environment.apiUrl+"recipients");
	}

	download(documentType: DocumentType, enquiry: Enquiry) {
		let url = environment.apiUrl + "download/" + ((documentType) ? "p" : "w"); //Works because WordDocument == 0 == falsey 

		this.HEADERS.append("Access-Control-Request-Headers", "X-Filename");

		return this.http
		.post(url, JSON.stringify(enquiry), {headers: this.HEADERS, observe: "response", responseType: "blob"})
		.subscribe((result) => {
			console.log(result);
			FileSaver.saveAs(result.body, result.headers.get("X-Filename"));
		});
	}

	sendEmail(enquiry: Enquiry): Observable<EmailDeliveryReceipt> {
		let url = environment.apiUrl + "mail/send";
		return this.http
		.post<EmailDeliveryReceipt>(url, JSON.stringify(enquiry), {headers: this.HEADERS, responseType: "json"});
	}

	getSignatureURL(enquiry: Enquiry) {
		let url = environment.apiUrl + "signature/url";
		return this.http
		.post(url, JSON.stringify(enquiry), {headers: this.HEADERS, responseType: "json"});
	}

	getEmailDeliveryReceipt(passphrase: string) : Observable<EmailDetails>  {
		let url = environment.apiUrl + "mail/receipt";
		return this.http.post<EmailDetails>(url, JSON.stringify({"passphrase":passphrase}), {headers: this.HEADERS, responseType: "json"});
	}

	getStatisticsPerMonth() : Observable<StatisticsData> {
		let url = environment.apiUrl + "statistics/sent";
		return this.http.get<StatisticsData>(url);
	}

	getStatisticsLive() : Observable<StatisticsData> {
		let url = environment.apiUrl + "statistics/sent/live";
		return this.http.get<StatisticsData>(url);
	}


	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}
