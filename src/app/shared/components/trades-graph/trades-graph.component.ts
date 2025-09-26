import { CommonModule } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { IonicComponentsModule } from '../../ionic-components.module';
import { CardLoadingComponent } from '../card-loading/card-loading.component';
import { Chart } from 'chart.js';
import { chartPieConfigs } from '../chart/chart.configs';

@Component({
  selector: 'app-trades-graph',
  template: `
    @if (totalLoss() && totalWin()) {
      <ion-card class="ion-no-shadow">
        <ion-card-header>
          <ion-card-title class="ion-fs-16">Win X Loss</ion-card-title>
        </ion-card-header>
        <ion-card-content class="ion-d-flex ion-justify-content-around">
          <div style="height: 140px; width: 140px" class="ion-margin-bottom">
            <canvas id="chart">{{ chart() }}</canvas>
          </div>
          <div
            class="ion-d-flex ion-align-items-center ion-justify-content-between ion-gap-24"
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
