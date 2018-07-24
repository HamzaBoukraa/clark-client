import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { USER_ROUTES } from '@env/route';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  get notifications() {
    return this.http.get(USER_ROUTES.GET_NOTIFICATIONS(this.auth.username), { withCredentials: true }).toPromise()
      .then((notififications: Notification[]) => {
        return notififications.map((notification: Notification) =>
          // Converts the numeric ISO date to the local date string for the view
          ({ ...notification, date: new Date(notification.date).toLocaleDateString() })
        );
      });
  }
}

export interface Notification {
  text: string;
  date: number;
  link: string;
}

