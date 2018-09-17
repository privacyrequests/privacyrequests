import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessFormComponent } from './success-form.component';

describe('SuccessFormComponent', () => {
  let component: SuccessFormComponent;
  let fixture: ComponentFixture<SuccessFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
