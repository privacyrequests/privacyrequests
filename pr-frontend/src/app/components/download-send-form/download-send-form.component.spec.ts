import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSendFormComponent } from './download-send-form.component';

describe('DownloadSendFormComponent', () => {
  let component: DownloadSendFormComponent;
  let fixture: ComponentFixture<DownloadSendFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadSendFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
