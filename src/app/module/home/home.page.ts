import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { PushNotificationsService } from 'src/app/core/service/pushNotification.service';
import { ChartForceBarComponent } from 'src/app/shared/chart/force-bar/force-bar.component';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { TradeItemComponent } from 'src/app/shared/components/trade-item/trade-item.component';
import { MONTHS, MONTHS_DIC } from 'src/app/shared/constants/months.constants';
import { CorretoraService } from 'src/app/shared/corretora/service/corretor.service';
import { EMonths } from 'src/app/shared/enums/months.enum';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { RoboService } from 'src/app/shared/robo/service/robo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  imports: [
    IonicComponentsModule,
    CommonModule,
    HeaderComponent,
    TradeItemComponent,
    CardLoadingComponent,
    ChartForceBarComponent,
  ],
  providers: [CorretoraService, RoboService],
})
export class HomePage {
  private _push = inject(PushNotificationsService);
  private _corretora = inject(CorretoraService);
  private _robo = inject(RoboService);

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

  readonly firstFiveTrades = computed(() => {
    const list = this.data.value()?.data;
    if (!list) return [];
    return list.slice(0, 5);
  });

  readonly totalWin = computed(() => {
    const win = this.data.value()?.data.filter((it) => it.result !== 'LOST');
    const price = win?.reduce((prev, curr) => curr.pnl + prev, 0);
    const quant = win?.length;
    return { price, quant };
  });

  readonly totalLoss = computed(() => {
    const loss = this.data.value()?.data.filter((it) => it.result === 'LOST');
    const price = loss?.reduce((prev, curr) => curr.pnl + prev, 0);
    const quant = loss?.length;
    return { price, quant };
  });

  readonly tradeInfo = toSignal(
    this._corretora.tradesInfo({
      start: MONTHS_DIC.get(EMonths.HOJE)!.start!,
      end: MONTHS_DIC.get(EMonths.HOJE)!.end!,
    }),
  );

  readonly roboWallet = toSignal(this._robo.wallets());

  readonly wallet = computed(() => {
    const list = this.roboWallet();
    if (!list) return null;
    return list[0];
  });

  constructor() {
    this._push.requestPermissions();
  }

  setMonth(id: EMonths): void {
    this.monthSelected.set(id);
  }
}
