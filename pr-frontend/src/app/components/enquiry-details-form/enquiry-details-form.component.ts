import { Component, OnInit, ViewChild } from '@angular/core';
import { EnquiryType } from '../../models/enquiry-type';
import { EnquiryTypeEnum } from '../../enums/enquiry-type.enum';
import { OptionalEnquiryTypeEnum } from '../../enums/optional-enquiry-type.enum';
import { EnquiryService } from '../../services/enquiry.service';
import { StepService } from '../../services/step.service';
import { Step } from '../../enums/step.enum';

@Component({
  selector: 'enquiry-details-form',
  templateUrl: './enquiry-details-form.component.html',
  styleUrls: ['./enquiry-details-form.component.css']
})
export class EnquiryDetailsFormComponent implements OnInit {

  @ViewChild("enquiryForm") enquiryForm;
  Step = Step;
  EnquiryTypeEnum = EnquiryTypeEnum;
  OptionalEnquiryTypeEnum = OptionalEnquiryTypeEnum;

  enquiryType = new EnquiryType<EnquiryTypeEnum>(EnquiryTypeEnum.AllData);
  optionalEnquiryTypeArray = new Array<EnquiryType<OptionalEnquiryTypeEnum>>();

  constructor(private enquiryService:EnquiryService, private stepService: StepService) { 
    this.stepService.onNextChange().subscribe((step) => {
      if (this.enquiryForm.invalid) {
        this.validateForm();
        this.stepService.setStep(Step.EnquiryDetailsStep);
      }
    });
  }

  private validateForm() {
    Object.keys(this.enquiryForm.controls).forEach(field => {
      const control = this.enquiryForm.controls[field];           
      control.markAsTouched();
    });
  }

  ngOnInit() {
    this.updateDocument();
  }

  changeEnquiryType(enquiryType: EnquiryTypeEnum) {
    this.enquiryType.type = enquiryType;
    this.enquiryType.additionalText = null;
    this.updateDocument();
  }

  updateDocument() {
    this.enquiryService.setEnquiryType(this.enquiryType);
    this.enquiryService.setOptionalEnquiryType(this.optionalEnquiryTypeArray);
  }

  isToggled(optionalEnquiryTypeEnum: OptionalEnquiryTypeEnum) {
    return this.getOptionalEnquiryType(optionalEnquiryTypeEnum) != null;
  }

  getOptionalEnquiryType(optionalEnquiryTypeEnum: OptionalEnquiryTypeEnum) {
    return this.optionalEnquiryTypeArray.find(oet => oet.type == optionalEnquiryTypeEnum);
  }

  toggleOptionalEnquiryTypeEnum(optionalEnquiryTypeEnum: OptionalEnquiryTypeEnum) {
    if (this.optionalEnquiryTypeArray.find(oet => oet.type == optionalEnquiryTypeEnum) != null) {
      //Remove
      this.optionalEnquiryTypeArray = this.optionalEnquiryTypeArray.filter(item => item.type !== optionalEnquiryTypeEnum);
    } else {
      //Add
      this.optionalEnquiryTypeArray.push(new EnquiryType<OptionalEnquiryTypeEnum>(optionalEnquiryTypeEnum));
    }
    this.updateDocument();
  }


}
