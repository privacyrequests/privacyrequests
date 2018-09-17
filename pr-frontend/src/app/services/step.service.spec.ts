import { TestBed, inject } from '@angular/core/testing';

import { StepService } from './step.service';

describe('StepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StepService]
    });
  });

  it('should be created', inject([StepService], (service: StepService) => {
    expect(service).toBeTruthy();
  }));
});
