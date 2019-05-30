import { Component, OnInit, Input } from '@angular/core';
import { COPY } from './file-details.copy';
import { LearningObject } from '@entity';

@Component({
  selector: 'onion-file-details',
  templateUrl: 'file-details.component.html',
  styleUrls: ['file-details.component.scss']
})
export class FileDetailsComponent implements OnInit {
  copy = COPY;
  @Input() length: string;
  @Input() materials: LearningObject.Material;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      // this.materials.files = [{ name: 'hello' }];
      // this.materials.files.push({ name: 'hello' });
    }, 5000);
  }
}
