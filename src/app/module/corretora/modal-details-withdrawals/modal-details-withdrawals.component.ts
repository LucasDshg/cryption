import { CurrencyPipe, DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { WITHDRAWALS_STATUS_DIC } from 'src/app/shared/services/corretora/constants/trades.constants';
import { IWithdrawalsItem } from 'src/app/shared/services/corretora/interface/withdrawals.interface';

@Component({
  selector: 'app-modal-details-withdrawals',
  template: ` <div class="wrapper ion-padding">
    <ion-text>
      <h2>Detalhes</h2>
    </ion-text>
    <ion-list>
      <ng-container
        *ngTemplateOutlet="
          template;
          context: { text: 'Documento', value: data()!.params.documentNumber }
        "
      ></ng-container>
      <ng-container
        *ngTemplateOutlet="
          template;
          context: {
            text: 'Tipo',
            value: data()!.method,
          }
        "
      ></ng-container>
      <ng-container
        *ngTemplateOutlet="
          template;
          context: {
            text: 'Valor',
            value: data().amount | currency,
          }
        "
      ></ng-container>
      <ng-container
        *ngTemplateOutlet="
          template;
          context: {
            text: 'Taxa',
            value: data().feeAmount | currency,
          }
        "
      ></ng-container>
      <ng-container
        *ngTemplateOutlet="
          template;
          context: {
            text: 'Solicitado em',
            value: data().createdAt | date,
          }
        "
      ></ng-container>
      <ng-container
        *ngTemplateOutlet="
          template;
          context: {
            text: 'Atualizado em',
            value: data().updatedAt | date,
          }
        "
      ></ng-container>

      <ng-container
        *ngTemplateOutlet="
          template;
          context: {
            text: 'Status',
            value: withdrawalsDic.get(data().status)?.name,
          }
        "
      ></ng-container>
    </ion-list>

    @if (data().status === 'REJECTED') {
      <ion-badge color="danger" class="ion-w-100 ion-p-8 ion-d-block">
        {{ data().rejectionReason }}
      </ion-badge>
    }

    <ng-template #template let-text="text" let-value="value">
      <li
        class="ion-d-flex ion-align-items-center ion-justify-content-between ion-m-bottom-16"
      >
        <ion-text color="light">
          <p class="ion-fs-14 ion-text-nowrap">{{ text }}</p>
        </ion-text>
        <span class="line"></span>
        <ion-text color="light">
          <p class="ion-fs-14 ion-text-nowrap">
            {{ value }}
          </p>
        </ion-text>
      </li>
    </ng-template>

    <ion-button
      expand="block"
      fill="clear"
      color="primary"
      shape="round"
      (click)="close()"
    >
      Fechar
    </ion-button>
  </div>`,
  imports: [IonicComponentsModule, DatePipe, CurrencyPipe, NgTemplateOutlet],
  providers: [ModalController],
})
export class ModalWithdrawalsDetailsComponent {
  private _modalCtrl = inject(ModalController);

  readonly withdrawalsDic = WITHDRAWALS_STATUS_DIC;

  readonly data = input.required<IWithdrawalsItem>();

  close(): void {
    this._modalCtrl.dismiss();
  }
}
