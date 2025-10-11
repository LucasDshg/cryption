import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';

@Component({
  selector: 'app-chart-force-bar',
  styles: [
    `
      .bar {
        height: 30px;
        color: white;
        font-weight: 500;
        font-size: 12px;
        padding: 6px 20px;
        position: relative;
        display: inline-block;
        text-wrap: nowrap;
        transition: width 300ms ease-in;
      }
      .win {
        border-radius: 2rem 0 0 2rem;
        background-color: var(--ion-color-success);
        text-align: end;

        &::after {
          content: '%';
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: white;
          position: absolute;
          display: flex;
          top: 0;
          right: -15px;
          z-index: 2;
          color: var(--ion-color-dark);
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
      }
      .loss {
        border-radius: 0 2rem 2rem 0;
        background-color: var(--ion-color-danger);
        text-align: start;
      }
    `,
  ],
  template: `
    <div class="ion-w-100 ion-d-flex ion-m-bottom-16">
      <span class="bar win" [style.width.%]="win() !== 0 ? win() : 50">
        {{ win().toFixed(2) }}
      </span>
      <span class="bar loss" [style.width.%]="loss() !== 0 ? loss() : 50">
        {{ loss().toFixed(2) }}
      </span>
    </div>
    <ion-text [color]="total() + expenses() > 0 ? 'success' : 'danger'">
      <p class="ion-fw-medium ion-text-nowrap">
        {{ total() + expenses() | currency }}
      </p>
    </ion-text>
  `,
  imports: [IonicComponentsModule, CurrencyPipe],
})
export class ChartForceBarComponent {
  readonly total = input.required<number>();
  readonly expenses = input.required<number>();
  readonly win = computed(() => {
    if (this.total() <= 0) return 0;
    const totalValue = Math.abs(this.expenses()) + this.total();
    return (this.total() * 100) / totalValue;
  });
  readonly loss = computed(() => {
    if (this.total() <= 0) return 0;
    const totalValue = Math.abs(this.expenses()) + this.total();
    return (Math.abs(this.expenses()) * 100) / totalValue;
  });
}
