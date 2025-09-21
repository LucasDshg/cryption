import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonicComponentsModule } from '../../ionic-components.module';
import {
  TRADE_DIRECTION_DIC,
  TRADE_RESULT_DIC,
} from '../../constants/trades.constants';
import { ITradesData } from '../../corretora/interface/trades.interface';
import { AppIconComponent } from '../app-icon/app-icon.component';

@Component({
  selector: 'trade-list',
  template: `
    <ion-item>
      <ion-avatar slot="start">
        <img src="assets/symbol/ETHUSDT.svg" />
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
          <p class="ion-m-0">{{ item().symbol }}</p>
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
export class TradeListComponent {
  readonly item = input.required<ITradesData>();
  readonly resultDic = TRADE_RESULT_DIC;
  readonly directionDic = TRADE_DIRECTION_DIC;
}
