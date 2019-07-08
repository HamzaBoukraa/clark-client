import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'clark-dashboard-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent {

  @Output() navigateBack: EventEmitter<void> = new EventEmitter();

}