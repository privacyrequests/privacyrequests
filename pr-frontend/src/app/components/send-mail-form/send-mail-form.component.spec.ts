import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMailFormComponent } from './send-mail-form.component';

describe('SendMailFormComponent', () => {
  let component: SendMailFormComponent;
  let fixture: ComponentFixture<SendMailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
