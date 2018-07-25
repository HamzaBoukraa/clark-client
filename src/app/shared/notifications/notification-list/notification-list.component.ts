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
  @Output() dismissNotification: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() { }

  dismiss(index: number) {
    // TODO server call here
    this.dismissNotification.emit(index);
  }

}
