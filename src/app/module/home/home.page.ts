import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ModalController } from '@ionic/angular/standalone';
import { CorretoraService } from 'src/app/core/service/corretor.service';

import { PushNotificationsService } from 'src/app/core/service/pushNotification.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MONTHS, MONTHS_DIC } from 'src/app/shared/constants/months.constants';
import { EMonths } from 'src/app/shared/enums/months.enum';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  imports: [IonicComponentsModule, CommonModule, HeaderComponent],
  providers: [],
})
export class HomePage {
  private _push = inject(PushNotificationsService);
  private _modalCtrl = inject(ModalController);
  private _corretora = inject(CorretoraService);
  private _cdr = inject(ChangeDetectorRef);

  readonly months = MONTHS;

  readonly monthSelected = signal<EMonths>(EMonths.HOJE);
  readonly data = rxResource({
    params: () => this.monthSelected,
    stream: ({ params }) =>
      this._corretora.trades({
        start: MONTHS_DIC.get(params())!.start!,
        end: MONTHS_DIC.get(params())!.end!,
      }),
  });

  constructor() {
    this._push.requestPermissions();
  }

  setMonth(id: EMonths): void {
    this.monthSelected.set(id);
  }
}
