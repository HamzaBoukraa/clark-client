import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { LearningObject } from '@cyber4all/clark-entity';
import { LearningGoal } from '@cyber4all/clark-entity/dist/learning-goal';

@Component({
  selector: 'clark-structure-object',
  templateUrl: './structure-object.component.html',
  styleUrls: ['./structure-object.component.scss']
})
export class StructureObjectComponent implements OnInit, OnChanges {

  @Input('learningObject') learningObject: LearningObject;
  @Input('indexLevel') indexLevel: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.learningObject) {
      this.learningObject =
      (changes.learningObject.currentValue instanceof LearningObject) ?
        changes.learningObject.currentValue :
        LearningObject.instantiate(changes.learningObject.currentValue);
    }
  }
}
