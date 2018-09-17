import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalSignatureDialogComponent } from './digital-signature-dialog.component';

describe('DigitalSignatureDialogComponent', () => {
  let component: DigitalSignatureDialogComponent;
  let fixture: ComponentFixture<DigitalSignatureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalSignatureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalSignatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
