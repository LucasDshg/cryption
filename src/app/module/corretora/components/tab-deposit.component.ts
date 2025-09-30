import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Clipboard } from '@capacitor/clipboard';
import { MaskitoDirective } from '@maskito/angular';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { IDepositPix } from 'src/app/shared/services/robo/interface/deposit.interface';
import { mask } from 'src/app/utils/mask.utils';

@Component({
  selector: 'app-tab-deposit',
  template: ` <ion-card class="ion-no-shadow">
    <ion-card-header>
      <ion-card-title color="primary">PIX </ion-card-title>
      <ion-card-subtitle color="medium">
        <small>
          Gere o link pix para realizar o deposito no banco de sua preferência.
        </small>
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      @if (linkCreated()) {
        <ion-card
          style="--ion-card-background: #000"
          [button]="true"
          class="ion-no-shadow"
          (click)="copy()"
        >
          <ion-card-content>
            <small class="ion-d-block">{{ linkCreated()?.qrCodeString }}</small>
          </ion-card-content>
        </ion-card>

        <ion-button
          shape="round"
          expand="full"
          color="primary"
          fill="clear"
          (click)="newLink()"
        >
          Gerar novo link
        </ion-button>
      } @else {
        <form [formGroup]="form">
          <ion-input
            formControlName="amout"
            label="Valor"
            label-placement="floating"
            fill="outline"
            type="tel"
            class="ion-m-bottom-16"
            [maskito]="masks.number"
            [maskitoElement]="masks.predicate"
          >
            <ion-text slot="start">$: </ion-text>
          </ion-input>
          <ion-input
            formControlName="doc"
            label="Documento"
            label-placement="floating"
            fill="outline"
            type="tel"
            class="ion-m-bottom-16"
          >
          </ion-input>
          <ion-button
            shape="round"
            expand="full"
            color="primary"
            fill="clear"
            [disabled]="loading()"
            (click)="createLink()"
          >
            @if (loading()) {
              <ion-spinner name="dots"></ion-spinner>
            } @else {
              Gerar link
            }
          </ion-button>
        </form>
      }
    </ion-card-content>
  </ion-card>`,
  imports: [
    IonicComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MaskitoDirective,
  ],
  providers: [ToastService],
})
export class TabDepositComponent {
  private _toast = inject(ToastService);

  readonly masks = mask;
  readonly loading = signal<boolean>(false);
  readonly linkCreated = signal<IDepositPix | undefined>(undefined);

  form = new FormGroup({
    amout: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    doc: new FormControl<''>('', [Validators.required]),
  });

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
}
