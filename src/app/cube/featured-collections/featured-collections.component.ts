import { Component, OnInit } from '@angular/core';
import { CollectionService } from 'app/core/collection.service';

@Component({
  selector: 'clark-featured-collections',
  templateUrl: './featured-collections.component.html',
  styleUrls: ['./featured-collections.component.scss']
})
export class FeaturedCollectionsComponent implements OnInit {

  collections;

  constructor(private collectionService: CollectionService) { }

  ngOnInit() {
    this.collectionService
      .getCollections()
      .then(collections => {
        this.collections = collections;
      })
      .catch(e => {
        console.error(e.message);
      });
  }

}