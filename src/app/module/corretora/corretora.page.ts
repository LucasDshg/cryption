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
import { ModalController, NavController } from '@ionic/angular/standalone';
import { MaskitoDirective } from '@maskito/angular';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { WITHDRAWALS_STATUS_DIC } from 'src/app/shared/services/corretora/constants/trades.constants';
import { IWithdrawalsItem } from 'src/app/shared/services/corretora/interface/withdrawals.interface';
import { CorretoraService } from 'src/app/shared/services/corretora/service/corretor.service';
import { IDepositPix } from 'src/app/shared/services/robo/interface/deposit.interface';
import { mask } from 'src/app/utils/mask.utils';
import { ModalWithdrawalsDetailsComponent } from './modal-details-withdrawals/modal-details-withdrawals.component';

@Component({
  selector: 'app-corretora',
  templateUrl: './corretora.page.html',
  imports: [
    IonicComponentsModule,
    CommonModule,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MaskitoDirective,
    CardLoadingComponent,
  ],
  providers: [CorretoraService, NavController],
})
export class CorretoraPage {
  private _corretoraService = inject(CorretoraService);
  private _toast = inject(ToastService);
  private _router = inject(NavController);
  private _modalCtrl = inject(ModalController);

  readonly masks = mask;
  readonly withdrawalsDic = WITHDRAWALS_STATUS_DIC;
  readonly loading = signal<boolean>(false);
  readonly linkCreated = signal<IDepositPix | undefined>(undefined);
  readonly tabSelected = signal<'SAQUES' | 'DEPOSIT'>('SAQUES');

  readonly data = toSignal(this._corretoraService.withdrawals());

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

  async details(data: IWithdrawalsItem): Promise<void> {
    const modal = await this._modalCtrl.create({
      component: ModalWithdrawalsDetailsComponent,
      componentProps: {
        data,
      },
      initialBreakpoint: 1,
      breakpoints: [0, 1],
    });
    await modal.present();
  }

  createLink(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // this.loading.set(true);
    // this._corretoraService
    //   .depositPix({
    //     amount: +this.form.value.amout!,
    //     documentNumber: this.form.value.doc!,
    //   })
    //   .pipe(finalize(() => this.loading.set(false)))
    //   .subscribe((res) => {
    //     this.form.reset();
    //     this.linkCreated.set(res);
    //   });
  }

  newLink(): void {
    this.linkCreated.set(undefined);
  }

  toggleTab(value: 'SAQUES' | 'DEPOSIT'): void {
    this.tabSelected.set(value);
  }

  back(): void {
    this._back();
  }

  private _back(): void {
    this._router.navigateBack('/wallet');
  }
}
