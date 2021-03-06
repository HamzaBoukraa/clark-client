// Core
import { NgModule } from '@angular/core';

// Angular Directives
import { ActivateDirective } from './activate.directive';
import { AutofocusDirective } from './autofocus.directive';
import { LearningObjectCardDirective } from './learning-object-card.directive';
import { TipDirective } from './tip.directive';
import { TrapFocusDirective } from './trap-focus.directive';
import { HammertimeDirective } from './hammertime.directive';

@NgModule({
  declarations: [
    ActivateDirective,
    AutofocusDirective,
    LearningObjectCardDirective,
    TipDirective,
    TrapFocusDirective,
    HammertimeDirective,
  ],
  exports: [
    ActivateDirective,
    AutofocusDirective,
    LearningObjectCardDirective,
    TipDirective,
    TrapFocusDirective,
    HammertimeDirective,
  ]
})
export class SharedDirectivesModule {}
