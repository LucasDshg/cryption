import { inject, Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';
import { AlertController, NavController } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { IFCM } from '../interfaces/fcm.interface';
import { UserStore } from '../store/user.store';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationsService extends RequestService<IFCM> {
  private _navCtrl = inject(NavController);
  private _alert = inject(AlertController);
  private _store = inject(UserStore).store;

  constructor() {
    super();
    this.collectionName = 'fcm';
  }

  requestPermissions(): void {
    const isPushNotificationsAvailable =
      Capacitor.isPluginAvailable('PushNotifications');

    if (isPushNotificationsAvailable) {
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === 'granted') {
          PushNotifications.register();
          this.saveRegistration();
        }
      });
    }
  }

  saveRegistration(): void {
    PushNotifications.addListener('registration', async (token: Token) => {
      await firstValueFrom(
        this.addData<IFCM>(
          {
            token: token.value,
            createAt: null as any,
          },
          { id: this._store()!.id! },
        ),
      );
    });
  }

  notificationReceived(): void {
    const isPushNotificationsAvailable =
      Capacitor.isPluginAvailable('PushNotifications');

    if (isPushNotificationsAvailable) {
      PushNotifications.addListener(
        'pushNotificationReceived',
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        (notification: PushNotificationSchema) => {},
      );
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        async (res: ActionPerformed) => {
          if (res.notification.data?.action) {
            this._navCtrl.navigateForward(res.notification.data.action);
          }
        },
      );
    }
  }
}
