import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDownloadFormComponent } from './document-download-form.component';

describe('DocumentDownloadFormComponent', () => {
  let component: DocumentDownloadFormComponent;
  let fixture: ComponentFixture<DocumentDownloadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentDownloadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDownloadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
