import { CurrencyPipe, DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import {
  TRADE_DIRECTION_DIC,
  TRADE_RESULT_DIC,
  TRADE_ROBO_DIC,
} from 'src/app/shared/services/corretora/constants/trades.constants';
import { ITradesData } from 'src/app/shared/services/corretora/interface/trades.interface';

@Component({
  selector: 'app-modal-details',
  template: ` <div class="wrapper ion-padding">
    <ion-text>
      <h2>Resumo da Operação</h2>
    </ion-text>
    <ion-list>
      <ng-container
        *ngTemplateOutlet="
          template;
          context: { text: 'Ativo', value: data().symbol }
        "
      ></ng-container>
      <ng-container
        *ngTemplateOutlet="
          template;
          context: {
            text: 'Tipo',
            value: resultDic.get(data().result)?.name,
          }
        "
      ></ng-container>
      <ng-container
        *ngTemplateOutlet="
          template;
          context: {
            text: 'Operação',
            value: directionDic.get(data().direction)!.name,
          }
        "
      ></ng-container>
      <ng-container
        *ngTemplateOutlet="
          template;
          context: {
            text: 'Data',
            value: data().syncOpensearchAt | date,
          }
        "
      ></ng-container>

      @if (data().fromBot) {
        <ng-container
          *ngTemplateOutlet="
            template;
            context: {
              text: 'Robô',
              value: tradeRoboDic.get(data().copyTrade.trader.nickname)?.name,
            }
          "
        ></ng-container>
      }
      <ng-container
        *ngTemplateOutlet="
          template;
          context: {
            text: 'Subtotal',
            value:
              (data().result === 'WON' && data().fromBot
                ? data().pnl * 2
                : data().pnl
              ) | currency,
          }
        "
      ></ng-container>

      @if (data().fromBot) {
        <ng-container
          *ngTemplateOutlet="
            template;
            context: {
              text: 'Desconto',
              value: '50%',
            }
          "
        ></ng-container>
      }
      <ng-container
        *ngTemplateOutlet="
          template;
          context: {
            text: 'Total',
            value: data().pnl | currency,
          }
        "
      ></ng-container>
    </ion-list>

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
export class ModalTradesDetailsComponent {
  private _modalCtrl = inject(ModalController);

  readonly resultDic = TRADE_RESULT_DIC;
  readonly directionDic = TRADE_DIRECTION_DIC;
  readonly tradeRoboDic = TRADE_ROBO_DIC;

  readonly data = input.required<ITradesData>();

  close(): void {
    this._modalCtrl.dismiss();
  }
}
