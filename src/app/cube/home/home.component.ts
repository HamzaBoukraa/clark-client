import { LearningObjectService } from '../learning-object.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Query } from '../../shared/interfaces/query';
import { COPY } from './home.copy';
import { AuthService } from '../../core/auth.service';
import { CollectionService, Collection } from '../../core/collection.service';
import { UsageStats } from '../shared/types';
import { UsageStatsService } from '../core/usage-stats/usage-stats.service';

@Component({
  selector: 'cube-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  copy = COPY;
  query: Query = {
    limit: 1,
    released: this.auth.hasPrivelagedAccess() ? undefined : true
  };
  placeholderText = this.copy.SEARCH_PLACEHOLDER;
  collections: Collection[];

  usageStats: UsageStats = {
    objects: {
      released: 0,
      underReview: 0,
      downloads: 0,
      lengths: {
        nanomodule: 0,
        micromodule: 0,
        module: 0,
        unit: 0,
        course: 0
      },
      outcomes: {
        remember_and_understand: 0,
        apply_and_analyze: 0,
        evaluate_and_synthesize: 0
      }
    },
    users: {
      total: 0,
      organizations: 0
    }
  };

  constructor(
    public learningObjectService: LearningObjectService,
    private router: Router,
    private auth: AuthService,
    private collectionService: CollectionService,
    private statsService: UsageStatsService
  ) {}

  ngOnInit() {
    this.statsService.getLearningObjectStats().then(stats => {
      this.usageStats.objects.released = stats.released;
      this.usageStats.objects.underReview = stats.total - stats.released;
      this.usageStats.objects.downloads = stats.downloads;
    });
    this.statsService.getUserStats().then(stats => {
      this.usageStats.users.total = stats.accounts;
      this.usageStats.users.organizations = stats.organizations;
    });
    this.collectionService
      .getCollections()
      .then(collections => {
        this.collections = collections.filter(
          c => c.abvName === 'nccp' || c.abvName === 'c5'
        );
      })
      .catch(e => {
        console.error(e.message);
      });
  }
  keyDownSearch(event) {
    if (event.keyCode === 13) {
      this.search();
    }
  }
  search() {
    this.query.text = this.query.text.trim();
    if (this.query.text === '') {
      this.learningObjectService.clearSearch();
    } else if (this.query !== undefined) {
      this.router.navigate(['/browse'], {
        queryParams: { text: this.query.text }
      });
    }
  }
  goToContribute() {
    this.router.navigate(['/onion']);
  }
}
