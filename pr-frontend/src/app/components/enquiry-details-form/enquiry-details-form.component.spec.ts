import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryDetailsFormComponent } from './enquiry-details-form.component';

describe('EnquiryDetailsFormComponent', () => {
  let component: EnquiryDetailsFormComponent;
  let fixture: ComponentFixture<EnquiryDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
