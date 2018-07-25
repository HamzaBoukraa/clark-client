import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../core/notification.service';

/**
 * Display a single notification with options to dismiss and a routerlink
 *
 * @export
 * @class NotificationComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'clark-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() notification: Notification;
  @Output() dismiss: EventEmitter<void> = new EventEmitter();
  dismissed = false;

  constructor() { }

  ngOnInit() {
  }

  triggerDismiss() {
    this.dismiss.emit();
    this.dismissed = true;
  }
}
