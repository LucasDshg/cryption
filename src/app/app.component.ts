import { CommonModule } from '@angular/common';
import {
  Component,
  EnvironmentInjector,
  inject,
  Injector,
} from '@angular/core';
import { App } from '@capacitor/app';

import { Device } from '@capacitor/device';
import { StatusBar, Style } from '@capacitor/status-bar';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import { NavController } from '@ionic/angular';
import {
  AlertController,
  IonApp,
  IonRouterOutlet,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { MenuComponent } from './core/components/menu/menu.component';
import { PushNotificationsService } from './core/service/pushNotification.service';
import { iconList } from './shared/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, CommonModule, MenuComponent],
  providers: [ModalController, NavController, AlertController],
})
export class AppComponent {
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
    this._theme();
  }

  private async _theme(): Promise<void> {
    const info = await Device.getInfo();
    if (info.platform === 'web') return;

    await StatusBar.setOverlaysWebView({ overlay: true });
    await StatusBar.setBackgroundColor({
      color: '#000000',
    });
    await StatusBar.setStyle({ style: Style.Dark });
    await EdgeToEdge.setBackgroundColor({
      color: '#000000',
    });
  }
}
