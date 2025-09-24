import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonicComponentsModule } from '../../ionic-components.module';
import {
  TRADE_DIRECTION_DIC,
  TRADE_RESULT_DIC,
  TRADE_SYMBOLS_DIC,
} from '../../services/corretora/constants/trades.constants';
import { ITradesData } from '../../services/corretora/interface/trades.interface';
import { AppIconComponent } from '../app-icon/app-icon.component';

@Component({
  selector: 'app-trade-item',
  template: `
    <ion-item [button]="isButton()">
      <ion-avatar
        slot="start"
        class="ion-m-0 ion-m-end-16"
        [style.width.px]="50"
        [style.height.px]="50"
      >
        <img [src]="symbolsDic.get(item().symbol)?.icon" />
      </ion-avatar>
      <div>
        <ion-label
          [color]="resultDic.get(item().result)!.color"
          class="ion-fs-16"
        >
          @if (item().result === 'LOST') {
            {{ -item().pnl | currency }}
          } @else {
            {{ item().pnl | currency }}
          }
        </ion-label>

        <ion-text color="medium">
          <p class="ion-m-0">{{ symbolsDic.get(item().symbol)?.name }}</p>
        </ion-text>
      </div>
      <div
        slot="end"
        class="ion-d-flex ion-flex-column ion-align-items-end ion-justify-content-between ion-gap-4"
      >
        <div class="ion-align-items-center ion-d-flex ion-gap-8">
          @if (item().fromBot) {
            <ion-text color="primary">
              <small class="ion-fw-semiBold">Bot</small>
            </ion-text>
          }
          <app-icon
            size="small"
            [name]="directionDic.get(item().direction)!.icon"
            [color]="directionDic.get(item().direction)!.color"
          ></app-icon>
        </div>
        <ion-text color="gray">
          <small>{{ item().syncOpensearchAt | date }}</small>
        </ion-text>
      </div>
    </ion-item>
  `,
  imports: [IonicComponentsModule, CommonModule, AppIconComponent],
})
export class TradeItemComponent {
  readonly item = input.required<ITradesData>();
  readonly isButton = input<boolean>();
  readonly resultDic = TRADE_RESULT_DIC;
  readonly directionDic = TRADE_DIRECTION_DIC;
  readonly symbolsDic = TRADE_SYMBOLS_DIC;
}
