import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityProofFormComponent } from './identity-proof-form.component';

describe('IdentityProofFormComponent', () => {
  let component: IdentityProofFormComponent;
  let fixture: ComponentFixture<IdentityProofFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityProofFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityProofFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
