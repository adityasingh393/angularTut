import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
// import { notificationType } from '../interfaces/common';

@Injectable({
  providedIn: 'root',
})
export class NotificationServices {
  constructor(private notificationService: NotificationService) {}
  show(
    notificationType: 'success' | 'error' | 'none' | 'info' | 'warning',
    content: string,
    horizontalPosition?: 'left' | 'right' | 'center',
    verticalPostion?: 'top' | 'bottom',
  ): void {
    this.notificationService.show({
      content: content,
      cssClass: 'button-notification',
      animation: { type: 'slide', duration: 400 },
      position: {
        horizontal: horizontalPosition || 'center',
        vertical: verticalPostion || 'top',
      },
      type: { style: notificationType },
      closable: true,
    });
  }
}
