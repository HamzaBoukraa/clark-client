import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { USER_ROUTES } from '@env/route';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: BehaviorSubject<Notification[]> = new BehaviorSubject([]);

  constructor(private auth: AuthService, private http: HttpClient) {
  }

  getNotifications(): Promise<void> {
    return this.http.get(USER_ROUTES.GET_NOTIFICATIONS(this.auth.username), { withCredentials: true }).toPromise()
      .then((notifications: any[]) => {
        this.notifications.next(notifications.map((notification) =>
          // Converts the numeric ISO date to the local date string for the view
          ({ ...notification, date: new Date(notification.timestamp) } as Notification)
        ));
      });
  }

  dismissNotification(index: number) {
    const element = this.notifications.getValue()[index];

    // TODO server call

    setTimeout(() => {
      // wait for animation
      this.notifications.value.splice(index, 1);
      this.notifications.next(this.notifications.value);
    }, 350);
  }

  dismissAllNotifications() {
    // TODO server call
    this.notifications.next([]);
  }
}

export interface Notification {
  text: string;
  date: Date;
  link: string;
}

