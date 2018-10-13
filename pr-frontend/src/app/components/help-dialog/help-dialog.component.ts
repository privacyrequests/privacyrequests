import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StepService } from '../../services/step.service';
import { HelpEntry } from '../../models/help-entry';
import { environment } from '../../../environments/environment';
import StaticHelpText from '../../../assets/static/faq.de-AT.json';

@Component({
  selector: 'help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
export class HelpDialogComponent implements OnInit {
  @Input() step: string;
  @Input() header: string;

  helpFaq: HelpEntry[];

  constructor(public activeModal: NgbActiveModal) { 
  }

  ngOnInit() {
    this.helpFaq = (<HelpEntry[]>(StaticHelpText[this.step]));
  }
}
