import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';

import { PushNotificationsService } from 'src/app/core/service/pushNotification.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MONTHS } from 'src/app/shared/constants/months.constants';
import { EMonths } from 'src/app/shared/enums/months.enum';
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

  readonly monthSelected = signal<EMonths>(EMonths.HOJE);
  readonly months = MONTHS;

  constructor() {
    this._push.requestPermissions();
  }

  setMonth(id: EMonths): void {
    this.monthSelected.set(id);
  }
}
