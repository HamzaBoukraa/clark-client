import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'clark-notifications-listing',
  styleUrls: ['listing.component.scss'],
  templateUrl: 'listing.component.html'
})
export class NotificationsListingComponent implements OnInit {
  @Input() notification;

  constructor() { }

  ngOnInit() { }
}
