import { TestBed, inject } from '@angular/core/testing';

import { EnquiryService } from './enquiry.service';

describe('EnquiryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnquiryService]
    });
  });

  it('should be created', inject([EnquiryService], (service: EnquiryService) => {
    expect(service).toBeTruthy();
  }));
});
