import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { IonicComponentsModule } from '../../ionic-components.module';
import { CardLoadingComponent } from '../card-loading/card-loading.component';
import { chartBarConfigs, chartLineConfigs } from '../chart/chart.configs';

@Component({
  selector: 'app-performance-graph',
  template: `
    <div style="height: 140px;" class="ion-margin-bottom">
      <canvas #lineChartCanvas>{{ chart() }}</canvas>
    </div>
  `,
  imports: [IonicComponentsModule, CommonModule, CardLoadingComponent],
})
export class PerformanceGraphComponent {
  @ViewChild('lineChartCanvas')
  private _chartCanvas!: ElementRef<HTMLCanvasElement>;

  readonly graphType = input.required<'SEMANA' | 'MES'>();
  // readonly totalWin = input.required<
  //   | {
  //       price: number | undefined;
  //       quant: number | undefined;
  //     }
  //   | undefined
  // >();
  // readonly totalLoss = input.required<
  //   | {
  //       price: number | undefined;
  //       quant: number | undefined;
  //     }
  //   | undefined
  // >();
  readonly chart = signal<any | undefined>(undefined);

  constructor() {
    effect(() => {
      setTimeout(() => {
        this._chart();
      }, 500);
      // if (this.totalLoss() && this.totalWin()) {
      // }
    });
  }

  private _chart(): void {
    if (this.chart()) {
      this.chart().clear();
      this.chart().destroy();
    }

    const canvas = this._chartCanvas.nativeElement;

    if (this.graphType() === 'SEMANA') {
      const ctx = canvas.getContext('2d');
      const gradient = ctx!.createLinearGradient(0, 0, 0, canvas.offsetHeight);
      gradient.addColorStop(0, 'rgba(34, 197, 94, 0.6)'); // Cor do topo do gradiente (verde com 60% de opacidade)
      gradient.addColorStop(1, 'rgba(34, 197, 94, 0)'); // Cor da base do gradiente (transparente)
      const data = {
        labels: ['Seg', 'Ter', 'Qua', 'Qui'],
        datasets: [
          {
            data: [35, 95, 25, 80], // Valores de exemplo para os pontos no gráfico
            fill: true, // Habilita o preenchimento da área abaixo da linha
            backgroundColor: gradient, // Aplica o gradiente criado
            borderColor: '#22c55e', // Cor da linha (verde sólido)
            borderWidth: 3, // Espessura da linha
            tension: 0.4, // Deixa a linha curvada (suavizada)
            pointBackgroundColor: '#22c55e', // Cor dos pontos
            pointBorderColor: '#fff', // Borda branca para os pontos (opcional, para destaque)
            pointBorderWidth: 2, // Espessura da borda do ponto (opcional)
            pointRadius: 5, // Tamanho dos pontos
            pointHoverRadius: 7, // Tamanho dos pontos ao passar o mouse
          },
        ],
      };
      const chart = new Chart(canvas, {
        type: 'line', // Tipo do gráfico
        data: data,
        options: chartLineConfigs.options,
      });
      this.chart.set(chart);
    } else {
      const data = {
        labels: [
          'D1',
          'D2',
          'D3',
          'D4',
          'D5',
          'D6',
          'D7',
          'D8',
          'D9',
          'D10',
          'D11',
          'D12',
        ],
        datasets: [
          {
            label: 'Vendas', // Oculto, mas útil para contexto
            data: [75, 95, 80, 40, 100, 65, 85, 88, 82, 35, 98, 70], // Valores de exemplo
            backgroundColor: '#22c55e', // Cor verde sólida para as barras
            borderColor: '#22c55e',
            borderWidth: 1,
            borderRadius: 6, // Arredonda os cantos das barras
            borderSkipped: false, // Garante que o raio seja aplicado em todas as bordas
            barPercentage: 0.6, // Deixa as barras um pouco mais finas
            categoryPercentage: 0.8, // Controla o espaçamento entre as categorias
          },
        ],
      };
      const chart = new Chart(canvas, {
        type: 'bar', // Tipo do gráfico
        data: data,
        options: chartBarConfigs.options,
      });
      this.chart.set(chart);
    }
  }
}
