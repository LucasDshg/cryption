import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Chart } from 'chart.js';
import { CardLoadingComponent } from '../../../../shared/components/card-loading/card-loading.component';
import { chartPieConfigs } from '../../../../shared/components/chart/chart.configs';
import {
  PERFORMANCE_ARRAY,
  PERFORMANCE_DIC,
} from '../../../../shared/constants/performance.constants';
import { IonicComponentsModule } from '../../../../shared/ionic-components.module';
import { ITradeInfo } from '../../../../shared/services/corretora/interface/trade-info.interface';
import { ITrades } from '../../../../shared/services/corretora/interface/trades.interface';
import { CorretoraService } from '../../../../shared/services/corretora/service/corretor.service';

@Component({
  selector: 'app-performance-graph',
  template: `
    @if (!performance.isLoading()) {
      <ion-card class="ion-no-shadow ion-m-0">
        <ion-card-header>
          <div
            class="ion-display-flex ion-flex-row ion-justify-content-between ion-align-items-center"
          >
            <ion-card-title class="ion-fs-16">Desempenho</ion-card-title>
            <div
              class="ion-d-flex ion-overflow-auto ion-align-items-center"
              style="scrollbar-width: none; scroll-snap-type: x mandatory"
              id="div_month"
            >
              @for (item of performanceArray; track item.name) {
                <ion-chip
                  [outline]="true"
                  class="ion-d-block ion-flex-1 ion-p-vertical-4"
                  [ngClass]="{
                    'chip-selected': item.name === performanceSelected(),
                  }"
                  (click)="setPerformance(item.name)"
                >
                  <small>
                    {{ item.name }}
                  </small>
                </ion-chip>
              }
            </div>
          </div>
        </ion-card-header>
        <ion-card-content>
          <ion-row>
            <ion-col class="ion-d-flex ion-p-0" size="12">
              <div
                style="height: 100px; width: 100px"
                class="ion-margin-bottom ion-m-end-16"
              >
                <canvas id="chart2">{{ chart() }}</canvas>
              </div>
              <div
                class="ion-d-flex ion-align-items-center ion-justify-content-around ion-w-100"
              >
                @if (totalWin()) {
                  <div class="ion-d-flex ion-flex-column ion-text-center">
                    <ion-text color="success">
                      <p class="ion-m-0">{{ totalWin()?.quant }}</p>
                    </ion-text>
                    <ion-text color="medium">
                      <small>Win</small>
                    </ion-text>
                  </div>
                }
                @if (totalLoss()) {
                  <div class="ion-d-flex ion-flex-column ion-text-center">
                    <ion-text color="danger">
                      <p class="ion-m-0">{{ totalLoss()?.quant }}</p>
                    </ion-text>
                    <ion-text color="medium">
                      <small>Loss</small>
                    </ion-text>
                  </div>
                }
              </div>
            </ion-col>
            <ion-col size="4">
              @defer (when totalProfit()) {
                <div class="ion-text-center">
                  <ion-text [color]="getColor(totalProfit())">
                    <p class="ion-m-0">{{ totalProfit() | currency }}</p>
                  </ion-text>
                  <ion-text color="medium">
                    <small>Lucro</small>
                  </ion-text>
                </div>
              }
            </ion-col>
            <ion-col size="4">
              @defer (when higherOperation()) {
                <div class="ion-text-center">
                  <ion-text color="success">
                    <p class="ion-m-0">{{ higherOperation() | currency }}</p>
                  </ion-text>
                  <ion-text color="medium">
                    <small>Maior Ganho</small>
                  </ion-text>
                </div>
              }
            </ion-col>
            <ion-col size="4">
              @defer (when lowestOperation()) {
                <div class="ion-text-center">
                  <ion-text color="danger">
                    <p class="ion-m-0">{{ lowestOperation() | currency }}</p>
                  </ion-text>
                  <ion-text color="medium">
                    <small>Maior Perda</small>
                  </ion-text>
                </div>
              }
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
export class PerformanceGraphComponent {
  private _corretora = inject(CorretoraService);

  readonly totalWin = computed(() => {
    if (this.performance.isLoading()) return undefined;

    const value = this.performance.value();
    const selected = this.performanceSelected();

    if (!value) return { quant: 0, percent: 0 };

    if (selected === 'MES') {
      const info = value as ITradeInfo;
      const quant = info.totalWon ?? 0;
      const totalLength = info.totalTradesCount ?? 0;

      const percent = totalLength > 0 ? (quant / totalLength) * 100 : 0;
      return { quant, percent: parseFloat(percent.toFixed(2)) };
    } else {
      const allData = (value as ITrades).data ?? [];
      const totalLength = allData.length;
      if (totalLength === 0) return { quant: 0, percent: 0 };

      const quant = allData.filter((it) => it.result !== 'LOST').length;
      const percent = (quant / totalLength) * 100;
      return { quant, percent: parseFloat(percent.toFixed(2)) };
    }
  });

  readonly totalLoss = computed(() => {
    if (this.performance.isLoading()) return undefined;

    const value = this.performance.value();
    const selected = this.performanceSelected();

    if (!value) return { quant: 0, percent: 0 };

    if (selected === 'MES') {
      const info = value as ITradeInfo;
      const quant = info.totalLost ?? 0;
      const totalLength = info.totalTradesCount ?? 0;

      const percent = totalLength > 0 ? (quant / totalLength) * 100 : 0;
      return { quant, percent: parseFloat(percent.toFixed(2)) };
    } else {
      const allData = (value as ITrades).data ?? [];
      const totalLength = allData.length;
      if (totalLength === 0) return { quant: 0, percent: 0 };

      const quant = allData.filter((it) => it.result === 'LOST').length;
      const percent = (quant / totalLength) * 100;
      return { quant, percent: parseFloat(percent.toFixed(2)) };
    }
  });

  readonly totalProfit = computed(() => {
    if (this.performance.isLoading()) return undefined;

    const value = this.performance.value();
    const selected = this.performanceSelected();

    if (!value) return 0;

    if (selected === 'MES') {
      const info = value as ITradeInfo;
      const total = info.totalProfit ?? 0;
      return parseFloat(total.toFixed(2));
    } else {
      const tradeList = (value as ITrades).data ?? [];
      if (tradeList.length === 0) return 0;

      const total = tradeList.reduce((sum, item) => sum + item.pnl, 0);
      return parseFloat(total.toFixed(2));
    }
  });

  readonly higherOperation = computed(() => {
    if (this.performance.isLoading()) return undefined;

    const value = this.performance.value();
    const selected = this.performanceSelected();

    if (!value) return 0;

    if (selected === 'MES') {
      const info = value as ITradeInfo;
      const maxPnl = info.maxProfit ?? 0;
      return parseFloat(maxPnl.toFixed(2));
    } else {
      const allData = (value as ITrades).data ?? [];
      if (allData.length === 0) return 0;

      const profits = allData.filter((item) => item.pnl > 0);
      if (profits.length === 0) return 0;

      const highestProfitOperation = profits.reduce((maxItem, currentItem) => {
        return currentItem.pnl > maxItem.pnl ? currentItem : maxItem;
      }, profits[0]);

      return parseFloat(highestProfitOperation.pnl.toFixed(2));
    }
  });

  readonly lowestOperation = computed(() => {
    if (this.performance.isLoading()) return undefined;

    const value = this.performance.value();
    const selected = this.performanceSelected();

    if (!value) return 0;

    if (selected === 'MES') {
      const info = value as ITradeInfo;
      const minPnl = info.minProfit ?? 0;
      return parseFloat(minPnl.toFixed(2));
    } else {
      const allData = (value as ITrades).data ?? [];
      if (allData.length === 0) return 0;

      const losses = allData.filter((item) => item.pnl < 0);
      if (losses.length === 0) return 0;

      const highestLossOperation = losses.reduce((minItem, currentItem) => {
        return currentItem.pnl < minItem.pnl ? currentItem : minItem;
      }, losses[0]);

      return parseFloat(highestLossOperation.pnl.toFixed(2));
    }
  });

  readonly chart = signal<any | undefined>(undefined);

  readonly performanceSelected = signal<'SEMANA' | 'MES'>('SEMANA');
  readonly performanceArray = PERFORMANCE_ARRAY;
  readonly performance = rxResource<ITrades | ITradeInfo, 'SEMANA' | 'MES'>({
    params: this.performanceSelected,
    stream: ({ params }) => {
      const timeRange = PERFORMANCE_DIC.get(params)!;

      if (params === 'MES') {
        return this._corretora.tradesInfo({
          start: timeRange.start!,
          end: timeRange.end!,
        });
      } else {
        return this._corretora.trades({
          start: timeRange.start!,
          end: timeRange.end!,
        });
      }
    },
  });

  constructor() {
    effect(() => {
      if (this.totalLoss() && this.totalWin()) {
        setTimeout(() => {
          this._createChart();
        }, 500);
      }
    });
  }

  private _createChart(): void {
    if (this.chart()) {
      this.chart().clear();
      this.chart().destroy();
    }

    const chart = new Chart('chart2', {
      type: 'doughnut',
      data: {
        labels: ['Win', 'Loss'],
        datasets: [
          {
            data: [this.totalWin()!.percent, this.totalLoss()!.percent],
            ...chartPieConfigs.datasets,
          },
        ],
      },
      options: {
        ...chartPieConfigs.options,
        plugins: {
          ...chartPieConfigs.options.plugins,
          tooltip: {
            callbacks: {
              label: (tooltipItem): any => {
                return `${tooltipItem.formattedValue}%`;
              },
            },
          },
        },
      },
    });
    this.chart.set(chart);
  }

  setPerformance(name: 'SEMANA' | 'MES'): void {
    this.performanceSelected.set(name);
  }

  getColor(value: number | undefined): 'success' | 'danger' | 'medium' {
    if (value === undefined || value === null) {
      return 'medium';
    }

    if (value > 0) {
      return 'success';
    } else if (value < 0) {
      return 'danger';
    } else {
      return 'medium';
    }
  }
}
