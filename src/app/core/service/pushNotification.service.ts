import { inject, Injectable } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { Capacitor } from '@capacitor/core';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';
import { NavController } from '@ionic/angular/standalone';
import { firstValueFrom, Observable } from 'rxjs';
import { IFCM } from '../interfaces/fcm.interface';
import { UserStore } from '../store/user.store';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationsService extends RequestService<IFCM> {
  private _navCtrl = inject(NavController);
  private _store = inject(UserStore).store;

  constructor() {
    super();
    this.collectionName = 'fcm';
  }

  fetch(): Observable<IFCM[]> {
    this.collectionName = 'fcm';
    return this.get({
      queryConstraints: [where('idUser', '==', this._store()!.id)],
    });
  }

  remove = (id: string): Observable<void> => {
    this.collectionName = 'fcm';
    return this.removeData(id);
  };

  requestPermissions(): void {
    const isPushNotificationsAvailable =
      Capacitor.isPluginAvailable('PushNotifications');

    if (isPushNotificationsAvailable) {
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === 'granted') {
          PushNotifications.register();
          this._saveRegistration();
        }
      });
    }
  }

  private _saveRegistration(): void {
    PushNotifications.addListener('registration', async (token: Token) => {
      this.collectionName = 'fcm';
      const fcmList = await firstValueFrom(this.fetch());

      if (fcmList.length > 0) {
        fcmList.forEach(async (it) => {
          await this.remove(it.id!);
        });
      }

      this.addData<IFCM>({
        token: token.value,
        idUser: this._store()!.id!,
        createAt: new Date(),
      }).subscribe();
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
