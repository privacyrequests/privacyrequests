import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirerDetailsFormComponent } from './enquirer-details-form.component';

describe('EnquirerDetailsFormComponent', () => {
  let component: EnquirerDetailsFormComponent;
  let fixture: ComponentFixture<EnquirerDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquirerDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquirerDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
