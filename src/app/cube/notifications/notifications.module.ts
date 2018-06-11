import { NgModule } from '@angular/core';

import { NotificationsComponent } from './notifications.component';
import { NotificationsListingComponent } from './listing/listing.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [],
  declarations: [NotificationsComponent, NotificationsListingComponent],
  providers: [],
})
export class NotificationsModule { }
