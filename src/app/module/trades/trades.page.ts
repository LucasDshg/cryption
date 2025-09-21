import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CorretoraService } from 'src/app/core/service/corretor.service';
import { chartPieConfigs } from 'src/app/shared/chart/chart.configs';
import { AppIconComponent } from 'src/app/shared/components/app-icon/app-icon.component';
import { CardErrorComponent } from 'src/app/shared/components/card-error/card-error.component';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MONTHS, MONTHS_DIC } from 'src/app/shared/constants/months.constants';
import {
  TRADE_DIRECTION_DIC,
  TRADE_RESULT_DIC,
} from 'src/app/shared/constants/trades.constants';
import { EMonths } from 'src/app/shared/enums/months.enum';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-trades',
  templateUrl: './trades.page.html',
  imports: [
    IonicComponentsModule,
    CommonModule,
    HeaderComponent,
    CardLoadingComponent,
    CardErrorComponent,
    AppIconComponent,
  ],
  providers: [],
})
export class TradesPage {
  private _corretora = inject(CorretoraService);

  readonly months = MONTHS;
  readonly resultDic = TRADE_RESULT_DIC;
  readonly directionDic = TRADE_DIRECTION_DIC;

  readonly monthSelected = signal<EMonths>(EMonths.HOJE);
  readonly chart = signal<any | undefined>(undefined);

  readonly list = rxResource({
    params: () => this.monthSelected,
    stream: ({ params }) =>
      this._corretora.trades({
        start: MONTHS_DIC.get(params())!.start!,
        end: MONTHS_DIC.get(params())!.end!,
      }),
  });

  readonly totalWin = computed(() => {
    const win = this.list.value()?.data.filter((it) => it.result !== 'LOST');
    const price = win?.reduce((prev, curr) => curr.amount + prev, 0);
    const quant = win?.length;
    return { price, quant };
  });

  readonly totalLoss = computed(() => {
    const loss = this.list.value()?.data.filter((it) => it.result === 'LOST');
    const price = loss?.reduce((prev, cuur) => cuur.amount + prev, 0);
    const quant = loss?.length;
    return { price, quant };
  });

  constructor() {
    effect(() => {
      if (this.list.hasValue()) {
        setTimeout(() => {
          this._chartWinLoss();
        }, 500);
      }
    });
  }

  setMonth(id: EMonths): void {
    this.monthSelected.set(id);
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
            data: [this.totalWin().price, this.totalLoss().price],
            ...chartPieConfigs.datasets,
          },
        ],
      },
      options: chartPieConfigs.options as any,
    });
    this.chart.set(chart);
  }
}
