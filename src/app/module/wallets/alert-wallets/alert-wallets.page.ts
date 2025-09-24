import { CommonModule, Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { MaskitoDirective } from '@maskito/angular';
import { finalize } from 'rxjs';
import { UserStore } from 'src/app/core/store/user.store';
import { AppIconComponent } from 'src/app/shared/components/app-icon/app-icon.component';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ConfirmAlert } from 'src/app/shared/components/modal-confirm/confirm-alert-decorator';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { RoboService } from 'src/app/shared/services/robo/service/robo.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { mask } from 'src/app/utils/mask.utils';
import { parseToFloat } from 'src/app/utils/utils.function';

@Component({
  selector: 'app-alert-wallets',
  templateUrl: './alert-wallets.page.html',
  imports: [
    IonicComponentsModule,
    CommonModule,
    HeaderComponent,
    CardLoadingComponent,
    AppIconComponent,
    FormsModule,
    ReactiveFormsModule,
    MaskitoDirective,
  ],
  providers: [RoboService, NavController, UserService],
})
export class AlertWalletsPage {
  private _userService = inject(UserService);
  private _store = inject(UserStore);
  private _router = inject(NavController);

  readonly masks = mask;
  readonly user = toSignal(
    this._userService.fetchById(this._store.store()!.id!),
  );
  readonly state = inject(Location).getState() as { balance: number };
  readonly loading = signal<boolean>(false);

  controlValue = new FormControl<number>(0, [
    Validators.required,
    Validators.min(3),
  ]);

  ionViewDidEnter(): void {
    this.controlValue.addValidators(Validators.max(this.state.balance));
  }

  @ConfirmAlert({
    title: 'Deseja desligar o alerta de saldo',
  })
  disabletatus(): void {
    if (this.user()?.alertSaldo) {
      this._userService
        .updateAlertValue(this.user()!.id!, null)
        .subscribe(() => this._back());
    }
  }

  submit(): void {
    if (this.controlValue.invalid) {
      this.controlValue.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this._userService
      .updateAlertValue(
        this.user()!.id!,
        parseToFloat(this.controlValue.value!.toString()),
      )
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(() => this._back());
  }

  private _back(): void {
    this._router.navigateBack('/wallet');
  }
}
