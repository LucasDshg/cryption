import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { UserStore } from 'src/app/core/store/user.store';
import { AppIconComponent } from 'src/app/shared/components/app-icon/app-icon.component';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MONTHS_DIC } from 'src/app/shared/constants/months.constants';
import { EMonths } from 'src/app/shared/enums/months.enum';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { CorretoraService } from 'src/app/shared/services/corretora/service/corretor.service';
import { RoboService } from 'src/app/shared/services/robo/service/robo.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.page.html',
  imports: [
    IonicComponentsModule,
    CommonModule,
    HeaderComponent,
    CardLoadingComponent,
    AppIconComponent,
  ],
  providers: [UserService, NavController, RoboService, CorretoraService],
})
export class WalletsPage {
  private _roboService = inject(RoboService);
  private _userService = inject(UserService);
  private _store = inject(UserStore);
  private _router = inject(NavController);
  private _corretora = inject(CorretoraService);
  private _auth = inject(AuthService);

  readonly tradeInfo = toSignal(
    this._corretora.tradesInfo({
      start: MONTHS_DIC.get(EMonths.HOJE)!.start!,
      end: MONTHS_DIC.get(EMonths.HOJE)!.end!,
    }),
  );

  readonly user = toSignal(
    this._userService.fetchById(this._store.store()!.id!),
  );
  readonly roboWallet = toSignal(this._roboService.wallets());

  goToAlert(): void {
    this._router.navigateForward(['/wallet', 'alert'], {
      state: {
        balance: this.roboWallet()![0].balance,
        alertSaldo: this.user()!.alertSaldo,
      },
    });
  }

  logout(): void {
    this._auth.logout();
  }

  goToDepositRobo(): void {
    this._router.navigateForward(['/bots', 'deposit']);
  }

  goToCorretora(): void {
    this._router.navigateForward(['/corretora']);
  }

  goToBonus(): void {
    this._router.navigateForward(['/bonus'], {
      state: {
        bonus: this.roboWallet()![1].balance,
      },
    });
  }
}
