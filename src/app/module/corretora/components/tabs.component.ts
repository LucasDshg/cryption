import { NgClass } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';

@Component({
  selector: 'app-tabs',
  template: ` <div class="ion-d-flex ion-overflow-auto ion-align-items-center">
    <ion-chip
      [outline]="true"
      class="ion-d-block ion-flex-1"
      [ngClass]="{ 'chip-selected': 'SAQUES' === tabSelected() }"
      (click)="toggleTab('SAQUES')"
    >
      Saques
    </ion-chip>

    <ion-chip
      [outline]="true"
      class="ion-d-block ion-flex-1"
      [ngClass]="{ 'chip-selected': 'DEPOSIT' === tabSelected() }"
      (click)="toggleTab('DEPOSIT')"
    >
      Depositar
    </ion-chip>
  </div>`,
  imports: [IonicComponentsModule, NgClass],
})
export class TabsComponent {
  readonly tabSelected = signal<'SAQUES' | 'DEPOSIT'>('SAQUES');
  readonly tabSelectedEvent = output<'SAQUES' | 'DEPOSIT'>();
  toggleTab(value: 'SAQUES' | 'DEPOSIT'): void {
    this.tabSelected.set(value);
    this.tabSelectedEvent.emit(value);
  }
}
