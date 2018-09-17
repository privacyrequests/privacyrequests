import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientSelectionFormComponent } from './recipient-selection-form.component';

describe('RecipientSelectionFormComponent', () => {
  let component: RecipientSelectionFormComponent;
  let fixture: ComponentFixture<RecipientSelectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientSelectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientSelectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
