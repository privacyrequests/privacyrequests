import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { SignaturePadModule } from 'angular2-signaturepad';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { HttpClientModule }    from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app.component';
import { EnquirerDetailsFormComponent } from './components/enquirer-details-form/enquirer-details-form.component';
import { DocumentPreviewComponent } from './components/document-preview/document-preview.component';
import { EnquiryDetailsFormComponent } from './components/enquiry-details-form/enquiry-details-form.component';
import { IdentityProofFormComponent } from './components/identity-proof-form/identity-proof-form.component';
import { SignaturePadDialogComponent } from './components/signature-pad-dialog/signature-pad-dialog.component';
import { DigitalSignatureDialogComponent } from './components/digital-signature-dialog/digital-signature-dialog.component';
import { DocumentDownloadFormComponent } from './components/document-download-form/document-download-form.component';
import { RecipientSelectionFormComponent } from './components/recipient-selection-form/recipient-selection-form.component';
import { EnquiryHttpService } from './services/enquiry-http.service';
import { EnquiryService } from './services/enquiry.service';
import { StepService } from './services/step.service';
import { SendMailFormComponent } from './components/send-mail-form/send-mail-form.component';
import { DownloadSendFormComponent } from './components/download-send-form/download-send-form.component';
import { EmailPreviewDialogComponent } from './components/email-preview-dialog/email-preview-dialog.component';
import { SuccessFormComponent } from './components/success-form/success-form.component';
import { EmailReceiptDialogComponent } from './components/email-receipt-dialog/email-receipt-dialog.component';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';
import { SendReportComponent } from './components/send-report/send-report.component';
import { ParentComponent } from './components/parent/parent.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

const appRoutes: Routes = [
  { path: '', component: ParentComponent },
  { path: 'app', component: ParentComponent },
  { path: 'sendebericht', component: SendReportComponent },
  { path: 'erfolgreich', component: SuccessFormComponent },
  { path: 'statistiken', component: StatisticsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EnquirerDetailsFormComponent,
    DocumentPreviewComponent,
    EnquiryDetailsFormComponent,
    IdentityProofFormComponent,
    SignaturePadDialogComponent,
    DigitalSignatureDialogComponent,
    DocumentDownloadFormComponent,
    RecipientSelectionFormComponent,
    SendMailFormComponent,
    DownloadSendFormComponent,
    EmailPreviewDialogComponent,
    SuccessFormComponent,
    EmailReceiptDialogComponent,
    HelpDialogComponent,
    SendReportComponent,
    ParentComponent,
    StatisticsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    SignaturePadModule,
    FilterPipeModule,
    HttpClientModule,
    FileUploadModule,
    ChartModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [EnquiryService, EnquiryHttpService, StepService],
  bootstrap: [AppComponent],
  entryComponents: [
    SignaturePadDialogComponent,
    DigitalSignatureDialogComponent,
    EmailPreviewDialogComponent,
    EmailReceiptDialogComponent,
    HelpDialogComponent
  ]
})
export class AppModule { }
