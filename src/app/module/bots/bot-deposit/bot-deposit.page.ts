import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Clipboard } from '@capacitor/clipboard';
import { NavController } from '@ionic/angular/standalone';
import { MaskitoDirective } from '@maskito/angular';
import { finalize } from 'rxjs';
import { UserStore } from 'src/app/core/store/user.store';
import { AppIconComponent } from 'src/app/shared/components/app-icon/app-icon.component';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { TRADE_DIRECTION_DIC } from 'src/app/shared/services/corretora/constants/trades.constants';
import { IDepositPix } from 'src/app/shared/services/robo/interface/deposit.interface';
import { RoboService } from 'src/app/shared/services/robo/service/robo.service';
import { mask } from 'src/app/utils/mask.utils';

@Component({
  selector: 'app-bot-deposit',
  templateUrl: './bot-deposit.page.html',
  imports: [
    IonicComponentsModule,
    CommonModule,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MaskitoDirective,
    AppIconComponent,
    CardLoadingComponent,
  ],
  providers: [RoboService, NavController],
})
export class BotDepositPage {
  private _store = inject(UserStore);
  private _roboService = inject(RoboService);
  private _toast = inject(ToastService);
  private _router = inject(NavController);

  readonly masks = mask;
  readonly directionDic = TRADE_DIRECTION_DIC;
  readonly loading = signal<boolean>(false);
  readonly linkCreated = signal<IDepositPix | undefined>(undefined);
  readonly tabSelected = signal<'EXTRATO' | 'DEPOSIT'>('DEPOSIT');

  readonly data = toSignal(
    this._roboService.transactions(
      this._store.store()!.robo.id!,
      this._store.store()!.robo.walletsId,
    ),
  );

  form = new FormGroup({
    amout: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    doc: new FormControl<''>('', [Validators.required]),
  });

  ionViewDidEnter(): void {}

  async copy(): Promise<void> {
    await Clipboard.write({
      string: this.linkCreated()!.qrCodeString,
    });
    this._toast.open('Link copiado!');
  }

  createLink(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this._roboService
      .depositPix({
        amount: +this.form.value.amout!,
        documentNumber: this.form.value.doc!,
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((res) => {
        this.form.reset();
        this.linkCreated.set(res);
      });
  }

  newLink(): void {
    this.linkCreated.set(undefined);
  }

  toggleTab(value: 'EXTRATO' | 'DEPOSIT'): void {
    this.tabSelected.set(value);
  }

  back(): void {
    this._back();
  }

  private _back(): void {
    this._router.navigateBack('/wallet');
  }
}
