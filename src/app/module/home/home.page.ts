import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';

import { PushNotificationsService } from 'src/app/core/service/pushNotification.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  imports: [IonicComponentsModule, CommonModule, HeaderComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  private _push = inject(PushNotificationsService);
  private _modalCtrl = inject(ModalController);
  private _router = inject(Router);
  private _cdr = inject(ChangeDetectorRef);

  constructor() {
    this._push.requestPermissions();
  }
}
