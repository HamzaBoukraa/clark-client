import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NotificationService, Notification } from '../../../core/notification.service';


/**
 * Wrapper component for the notification-list component, designed as a dropdown.
 * Handles the flow of notifiations beytween the service and the list
 *
 * @export
 * @class NotificationDropdownComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'clark-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.scss']
})
export class NotificationDropdownComponent implements OnInit, OnChanges {

  @Input() position: [number, number]; // [left: number, top: number] (both in px)
  @Input() active: boolean;
  @Input() notifications: Notification[];

  constructor(private store: NotificationService) { }

  ngOnInit() {
    // we didn't pass anything, so perform query
    if (!this.notifications) {
      this.fetchNotifications();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  fetchNotifications() {
    console.log('querying for notifications');
    this.store.getNotifications().then((val: Notification[]) => {
      this.notifications = val;
    });
  }

  dismissNotification(index: number) {
    // TODO server call and execute following logic if request is successful
    setTimeout(() => {
      this.notifications.splice(index, 1);
    }, 300);
  }
}
