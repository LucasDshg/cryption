// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CommonModule } from '@angular/common';
import {
  Component,
  EnvironmentInjector,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { App } from '@capacitor/app';

import { NavController } from '@ionic/angular';
import {
  AlertController,
  IonApp,
  IonRouterOutlet,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { PushNotificationsService } from './core/service/pushNotification.service';
import { iconList } from './shared/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, CommonModule],
  providers: [ModalController, NavController, AlertController],
})
export class AppComponent implements OnInit {
  private _push = inject(PushNotificationsService);
  private _navCtrl = inject(NavController);
  environmentInjector = inject(EnvironmentInjector);
  static injector: Injector;

  constructor() {
    const injector = inject(Injector);

    AppComponent.injector = injector;

    addIcons(iconList);
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        this._navCtrl.back();
      } else {
        App.exitApp();
      }
    });

    this._push.notificationReceived();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
