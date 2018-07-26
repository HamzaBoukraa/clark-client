import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from 'app/core/notification.service';

@Component({
  selector: 'clark-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(private store: NotificationService) {
    store.notifications.subscribe(val => {
      this.notifications = val;
    });
  }

  ngOnInit() {
  }

  dismissNotification(index: number) {
    this.store.dismissNotification(index);
  }

  dismissAllNotifications() {
    this.store.dismissAllNotifications();
  }

}
