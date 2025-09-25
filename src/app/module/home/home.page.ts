import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ModalController } from '@ionic/angular/standalone';
import { Chart } from 'chart.js';
import { combineLatest, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { PushNotificationsService } from 'src/app/core/service/pushNotification.service';
import { UserStore } from 'src/app/core/store/user.store';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { chartPieConfigs } from 'src/app/shared/components/chart/chart.configs';
import { ChartForceBarComponent } from 'src/app/shared/components/chart/force-bar/force-bar.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MonthSelectComponent } from 'src/app/shared/components/month-select/month-select.component';
import { TradeItemComponent } from 'src/app/shared/components/trade-item/trade-item.component';
import { MONTHS_DIC } from 'src/app/shared/constants/months.constants';
import { EMonths } from 'src/app/shared/enums/months.enum';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { ITradesData } from 'src/app/shared/services/corretora/interface/trades.interface';
import { CorretoraService } from 'src/app/shared/services/corretora/service/corretor.service';
import { RoboService } from 'src/app/shared/services/robo/service/robo.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ModalTradesDetailsComponent } from '../../shared/components/modal-details-trade/modal-details-trades.component';

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
    MonthSelectComponent,
  ],
  providers: [CorretoraService, RoboService, UserService, ModalController],
})
export class HomePage implements AfterViewInit {
  private _modalCtrl = inject(ModalController);

  private _push = inject(PushNotificationsService);
  private _corretora = inject(CorretoraService);
  private _robo = inject(RoboService);
  private _auth = inject(AuthService);
  private _userService = inject(UserService);
  private _store = inject(UserStore);

  readonly monthSelected = signal<EMonths>(EMonths.HOJE);
  readonly updatedToken = signal<boolean>(false);
  readonly chart = signal<any | undefined>(undefined);

  readonly data = rxResource({
    params: this.monthSelected,
    stream: ({ params }) =>
      this._corretora.trades({
        start: MONTHS_DIC.get(params)!.start!,
        end: MONTHS_DIC.get(params)!.end!,
      }),
  });

  readonly totalWin = computed(() => {
    if (this.data.isLoading()) return undefined;

    const win = this.data.value()?.data.filter((it) => it.result !== 'LOST');
    const price = win?.reduce((prev, curr) => curr.pnl + prev, 0);
    const quant = win?.length;
    return { price, quant };
  });

  readonly totalLoss = computed(() => {
    if (this.data.isLoading()) return undefined;
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

  constructor() {
    this._push.requestPermissions();
    effect(() => {
      if (this.data.value()) {
        setTimeout(() => {
          this._chartWinLoss();
        }, 500);
      }
    });
  }
  ngAfterViewInit(): void {
    this._renoveTokens();
  }

  updateData(month: EMonths): void {
    this.monthSelected.set(month);
  }
  async detailsTrade(data: ITradesData): Promise<void> {
    const modal = await this._modalCtrl.create({
      component: ModalTradesDetailsComponent,
      componentProps: {
        data,
      },
      initialBreakpoint: 1,
      breakpoints: [0, 1],
    });
    await modal.present();
  }

  private _renoveTokens(): void {
    if (this.updatedToken()) return;

    combineLatest([
      this._auth.robo(this._store.store()!.credential.robo),
      this._auth.corretora(this._store.store()!.credential.corretora),
    ])
      .pipe(
        tap((res) => {
          this._store.update({
            tokenBot: res[0].token,
            tokenCorretora: res[1].token,
          });
        }),
        switchMap((res) =>
          this._userService.updateToken(
            this._store.store()!.id!,
            res[0].token,
            res[1].token,
          ),
        ),
      )
      .subscribe(() => this.updatedToken.set(true));
  }

  private _chartWinLoss(): void {
    if (this.chart()) {
      this.chart().clear();
      this.chart().destroy();
    }

    const chart = new Chart('chart', {
      type: 'doughnut',
      data: {
        labels: ['Win', 'Loss'],
        datasets: [
          {
            data: [this.totalWin()!.price, this.totalLoss()!.price],
            ...chartPieConfigs.datasets,
          },
        ],
      },
      options: chartPieConfigs.options as any,
    });
    this.chart.set(chart);
  }
}
