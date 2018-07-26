import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../core/notification.service';

/**
 * Displays a list of notification components from inputed array, or placeholder notifications while loading
 *
 * @export
 * @class NotificationListComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 */
@Component({
  selector: 'clark-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  @Input() notifications: Notification[];
  @Input() expandable: boolean;
  @Output() dismissNotification: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() { }

  dismiss(index: number) {
    this.dismissNotification.emit(index);
  }

  /**
   * Returns the first index of a notification with the specified date (or -1 if a matching notification doesn't exist)
   * @param date
   */
  firstWithDate(date: Date) {
    for (let i = 0, l = this.notifications.length; i < l; i++) {
      if (date.toDateString() === this.notifications[i].date.toDateString()) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Returns the number of notifications with specific date.
   * @param date
   */
  countWithDate(date: Date) {
    let count = 0;
    for (let i = 0, l = this.notifications.length; i < l; i++) {
      if (date.toDateString() === this.notifications[i].date.toDateString()) {
        count++;
      }
    }
    return count;
  }

}
