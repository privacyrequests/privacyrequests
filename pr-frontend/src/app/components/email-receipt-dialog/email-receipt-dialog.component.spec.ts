import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailReceiptDialogComponent } from './email-receipt-dialog.component';

describe('EmailReceiptDialogComponent', () => {
  let component: EmailReceiptDialogComponent;
  let fixture: ComponentFixture<EmailReceiptDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailReceiptDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailReceiptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
