import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CollectionService, Collection } from 'app/core/collection.service';

@Component({
  selector: 'clark-collection-selector-popup',
  templateUrl: './collection-selector-popup.component.html',
  styleUrls: ['./collection-selector-popup.component.scss']
})
export class CollectionSelectorPopupComponent {
  // list of collections from service
  @Input() collections: Collection[];

  // highlights collection if one is already present
  @Input() currentCollection: string;

  // fires when the user selects a choice
  @Output() choice: EventEmitter<string> = new EventEmitter();

  // emits event to parent component to cancel submission
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  // flags
  licenseAccepted = false;

  constructor(private collectionService: CollectionService) { }

  select(collection: string) {
    this.currentCollection = collection;
  }

  submit() {
    this.choice.emit(this.currentCollection);
  }

}
