import { Component, EventEmitter, OnInit, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'onion-learning-object-outcome-container',
  templateUrl: 'outcome-page.component.html',
  styleUrls: [ 'outcome-page.component.scss' ]
})
export class LearningObjectOutcomePageComponent implements OnChanges, OnInit {

  @Input() learningObject;
  @Input() submitted;
  @Input() outcomeIndex;
  @Output() newOutcomeRequest = new EventEmitter<string>();
  @Output() deleteOutcomeRequest = new EventEmitter<number>();

  activeOutcome;

  constructor() { }

  ngOnInit() {
    this.activeOutcome = this.learningObject.outcomes[this.outcomeIndex];
  }

  ngOnChanges(changes) {
    this.activeOutcome = this.learningObject.outcomes[this.outcomeIndex];
  }

  newOutcome() {
    this.newOutcomeRequest.next('NEW_OUTCOME');
  }

  deleteOutcome() {
    this.deleteOutcomeRequest.next(this.outcomeIndex);
  }
}
