import { Component, OnInit } from '@angular/core';
import { PressCoverageService, Mention } from '../../core/press-coverage.service';

@Component({
  selector: 'clark-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss']
})
export class PressComponent implements OnInit {

  mentions: Mention[];

  constructor(private coverageService: PressCoverageService) { }

  ngOnInit() {
    this.coverageService.getMentions().then(mentions => {
      this.mentions = mentions;
    });
  }

  downloadPressKit() {
    // TODO
  }
}