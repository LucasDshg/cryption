import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { PushNotificationsService } from 'src/app/core/service/pushNotification.service';
import { UserStore } from 'src/app/core/store/user.store';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { ChartForceBarComponent } from 'src/app/shared/components/chart/force-bar/force-bar.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MonthSelectComponent } from 'src/app/shared/components/month-select/month-select.component';
import { TradeItemComponent } from 'src/app/shared/components/trade-item/trade-item.component';
import { MONTHS_DIC } from 'src/app/shared/constants/months.constants';
import { EMonths } from 'src/app/shared/enums/months.enum';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { CorretoraService } from 'src/app/shared/services/corretora/service/corretor.service';
import { RoboService } from 'src/app/shared/services/robo/service/robo.service';
import { UserService } from 'src/app/shared/services/user/user.service';

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
  providers: [CorretoraService, RoboService],
})
export class HomePage implements AfterViewInit {
  private _push = inject(PushNotificationsService);
  private _corretora = inject(CorretoraService);
  private _robo = inject(RoboService);
  private _auth = inject(AuthService);
  private _userService = inject(UserService);
  private _store = inject(UserStore).store;

  readonly monthSelected = signal<EMonths>(EMonths.HOJE);
  readonly updatedToken = signal<boolean>(false);

  readonly data = rxResource({
    params: this.monthSelected,
    stream: ({ params }) =>
      this._corretora.trades({
        start: MONTHS_DIC.get(params)!.start!,
        end: MONTHS_DIC.get(params)!.end!,
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

  readonly wallet = computed(() => {
    const list = this.roboWallet();
    if (!list) return null;
    return list[0];
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
  }
  ngAfterViewInit(): void {
    this._renoveTokens();
  }

  updateData(month: EMonths): void {
    this.monthSelected.set(month);
    this.data.reload();
  }

  private _renoveTokens(): void {
    if (this.updatedToken()) return;
    this._auth
      .robo(this._store()!.credential.robo)
      .pipe(
        switchMap((res) =>
          this._userService.updateToken(this._store()!.id!, res.token),
        ),
      )
      .subscribe(() => this.updatedToken.set(true));
  }
}
