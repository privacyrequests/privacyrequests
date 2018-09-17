import { TestBed, inject } from '@angular/core/testing';

import { EnquiryHttpService } from './enquiry-http.service';

describe('EnquiryHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnquiryHttpService]
    });
  });

  it('should be created', inject([EnquiryHttpService], (service: EnquiryHttpService) => {
    expect(service).toBeTruthy();
  }));
});
