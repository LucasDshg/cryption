import { CommonModule } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { Chart } from 'chart.js';
import { IonicComponentsModule } from '../../../../shared/ionic-components.module';
import { CardLoadingComponent } from '../../../../shared/components/card-loading/card-loading.component';
import {
  chartBarConfigs,
  chartPieConfigs,
  zeroLinePlugin,
} from '../../../../shared/components/chart/chart.configs';

@Component({
  selector: 'app-bot-x-manual-graph',
  template: `
    @if (totalBot() && totalManual()) {
      <ion-card class="ion-no-shadow ion-m-0">
        <ion-card-header>
          <ion-card-title class="ion-fs-16">Bot X Manual</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-row>
            <ion-col class="ion-d-flex ion-p-0" size="12">
              <div
                style="height: 100px; width: 100px"
                class="ion-margin-bottom ion-m-end-16"
              >
                <canvas id="chartBotXManual">{{ chart() }}</canvas>
              </div>
              <div
                class="ion-d-flex ion-align-items-center ion-justify-content-around ion-w-100"
              >
                @if (totalBot()) {
                  <div>
                    <ion-text color="success">
                      <small>Bot</small>
                    </ion-text>
                    <ion-text color="medium">
                      <p class="ion-m-0">
                        {{ totalBot()?.price | currency }}
                      </p>
                    </ion-text>
                    <ion-text color="gray">
                      <small>Total: {{ totalBot()!.quant }} </small>
                    </ion-text>
                  </div>
                }
                @if (totalManual()) {
                  <div>
                    <ion-text color="primary">
                      <small>Manual</small>
                    </ion-text>
                    <ion-text color="medium">
                      <p class="ion-m-0">
                        {{ totalManual()!.price | currency }}
                      </p>
                    </ion-text>
                    <ion-text color="gray">
                      <small>Total: {{ totalManual()!.quant }} </small>
                    </ion-text>
                  </div>
                }
              </div>
            </ion-col>
          </ion-row>
        </ion-card-content>
      </ion-card>
    } @else {
      <app-card-loading type="titleAndSubtitle"></app-card-loading>
    }
  `,
  imports: [IonicComponentsModule, CommonModule, CardLoadingComponent],
})
export class BotXManualGraphComponent {
  readonly totalBot = input.required<
    | {
        price: number | undefined;
        quant: number | undefined;
      }
    | undefined
  >();
  readonly totalManual = input.required<
    | {
        price: number | undefined;
        quant: number | undefined;
      }
    | undefined
  >();
  readonly chart = signal<any | undefined>(undefined);

  constructor() {
    effect(() => {
      if (this.totalBot() && this.totalManual()) {
        setTimeout(() => {
          this._chartWinLoss();
        }, 500);
      }
    });
  }

  private _chartWinLoss(): void {
    if (this.chart()) {
      this.chart().clear();
      this.chart().destroy();
    }

    const chart = new Chart('chartBotXManual', {
      type: 'bar',
      data: {
        labels: ['Bot', 'Manual'],
        datasets: [
          {
            data: [this.totalBot()!.price, this.totalManual()!.price],
            backgroundColor: ['#00b221', '#ecce91'],
            borderColor: 'transparent',
          },
        ],
      },
      options: chartBarConfigs.options as any,
      plugins: [zeroLinePlugin],
    });
    this.chart.set(chart);
  }
}
