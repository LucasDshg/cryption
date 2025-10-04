import { CommonModule } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { Chart } from 'chart.js';
import { IonicComponentsModule } from '../../ionic-components.module';
import { CardLoadingComponent } from '../card-loading/card-loading.component';
import { chartPieConfigs } from '../chart/chart.configs';

@Component({
  selector: 'app-trades-graph',
  template: `
    @if (totalLoss() && totalWin()) {
      <ion-card class="ion-no-shadow ion-m-0">
        <ion-card-header>
          <ion-card-title class="ion-fs-16">Win X Loss</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-row>
            <ion-col class="ion-d-flex ion-p-0" size="12">
              <div
                style="height: 100px; width: 100px"
                class="ion-margin-bottom ion-m-end-16"
              >
                <canvas id="chart">{{ chart() }}</canvas>
              </div>
              <div
                class="ion-d-flex ion-align-items-center ion-justify-content-around ion-w-100"
              >
                @if (totalWin()) {
                  <div>
                    <ion-text color="success">
                      <small>Win</small>
                    </ion-text>
                    <ion-text color="medium">
                      <p class="ion-m-0">
                        {{ totalWin()?.price | currency }}
                      </p>
                    </ion-text>
                    <ion-text color="gray">
                      <small>Total: {{ totalWin()!.quant }} </small>
                    </ion-text>
                  </div>
                }
                @if (totalLoss()) {
                  <div>
                    <ion-text color="danger">
                      <small>Loss</small>
                    </ion-text>
                    <ion-text color="medium">
                      <p class="ion-m-0">{{ totalLoss()!.price | currency }}</p>
                    </ion-text>
                    <ion-text color="gray">
                      <small>Total: {{ totalLoss()!.quant }} </small>
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
export class TradesGraphComponent {
  readonly totalWin = input.required<
    | {
        price: number | undefined;
        quant: number | undefined;
      }
    | undefined
  >();
  readonly totalLoss = input.required<
    | {
        price: number | undefined;
        quant: number | undefined;
      }
    | undefined
  >();
  readonly chart = signal<any | undefined>(undefined);

  constructor() {
    effect(() => {
      if (this.totalLoss() && this.totalWin()) {
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

    const chart = new Chart('chart', {
      type: 'pie',
      data: {
        labels: ['Win', 'Loss'],
        datasets: [
          {
            data: [this.totalWin()!.price, this.totalLoss()!.price],
            ...chartPieConfigs.datasets,
          },
        ],
      },
      options: chartPieConfigs.options as any,
    });
    this.chart.set(chart);
  }
}
