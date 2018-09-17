import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePadDialogComponent } from './signature-pad-dialog.component';

describe('SignaturePadDialogComponent', () => {
  let component: SignaturePadDialogComponent;
  let fixture: ComponentFixture<SignaturePadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignaturePadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturePadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
