import { CommonModule } from '@angular/common';
import { Component, OnInit, output, signal } from '@angular/core';
import { IonicComponentsModule } from '../../ionic-components.module';
import { MONTHS, MONTHS_DIC } from '../../constants/months.constants';
import { EMonths } from '../../enums/months.enum';

@Component({
  selector: 'month-select',
  template: `
    <div
      class="ion-d-flex ion-overflow-auto ion-align-items-center"
      style="scrollbar-width: none; scroll-snap-type: x mandatory"
      id="div_month"
    >
      @for (month of months; track month.id) {
        <ion-chip
          [outline]="true"
          class="ion-d-block ion-flex-1"
          [ngClass]="{ 'chip-selected': month.id === monthSelected() }"
          (click)="setMonth(month.id)"
        >
          {{ month.name }}
        </ion-chip>
      }
    </div>
  `,
  imports: [IonicComponentsModule, CommonModule],
})
export class MonthSelectComponent implements OnInit {
  readonly months = MONTHS;
  readonly monthChange = output<EMonths>();

  readonly monthSelected = signal<EMonths>(EMonths.HOJE);

  ngOnInit(): void {
    this.monthChange.emit(EMonths.HOJE);
  }

  setMonth(id: EMonths): void {
    this.monthSelected.set(id);
    this.monthChange.emit(id);
  }
}
