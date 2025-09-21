import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ModalController } from '@ionic/angular/standalone';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { chartPieConfigs } from 'src/app/shared/chart/chart.configs';
import { CardErrorComponent } from 'src/app/shared/components/card-error/card-error.component';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { TradeItemComponent } from 'src/app/shared/components/trade-item/trade-item.component';
import { MONTHS, MONTHS_DIC } from 'src/app/shared/constants/months.constants';
import { ITradesData } from 'src/app/shared/corretora/interface/trades.interface';
import { CorretoraService } from 'src/app/shared/corretora/service/corretor.service';
import { EMonths } from 'src/app/shared/enums/months.enum';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { ModalTradesDetailsComponent } from './modal-details/modal-details.component';

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
    TradeItemComponent,
  ],
  providers: [CorretoraService, ModalController],
})
export class TradesPage {
  private _corretora = inject(CorretoraService);
  private _modalCtrl = inject(ModalController);

  readonly months = MONTHS;

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
    const price = win?.reduce((prev, curr) => curr.pnl + prev, 0);
    const quant = win?.length;
    return { price, quant };
  });

  readonly totalLoss = computed(() => {
    const loss = this.list.value()?.data.filter((it) => it.result === 'LOST');
    const price = loss?.reduce((prev, curr) => curr.pnl + prev, 0);
    const quant = loss?.length;
    return { price, quant };
  });

  constructor() {
    effect(() => {
      if (this.list.value()) {
        setTimeout(() => {
          this._chartWinLoss();
        }, 500);
      }
    });
  }

  setMonth(id: EMonths): void {
    this.monthSelected.set(id);
    this.list.reload();
  }

  async details(data: ITradesData): Promise<void> {
    const modal = await this._modalCtrl.create({
      component: ModalTradesDetailsComponent,
      componentProps: {
        data,
      },
      initialBreakpoint: 1,
      breakpoints: [0, 1],
    });
    await modal.present();
  }

  private _chartWinLoss(): void {
    if (this.chart()) {
      this.chart().clear();
      this.chart().destroy();
    }

    const chart = new Chart('chart', {
      type: 'doughnut',
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
