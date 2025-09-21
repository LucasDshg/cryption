import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { IonicComponentsModule } from '../../ionic-components.module';

@Component({
  selector: 'app-icon',
  template: `<ion-icon
    [name]="iconName()"
    [size]="size()"
    [slot]="slot()"
    [color]="color()"
  ></ion-icon>`,
  imports: [IonicComponentsModule, CommonModule],
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class AppIconComponent {
  readonly name = input.required<string>();
  readonly size = input<string>('large');
  readonly color = input<string>('');
  readonly slot = input<
    'start' | 'end' | 'icon-only' | 'primary' | 'secondary'
  >('primary');

  readonly iconName = computed(() =>
    this.name().endsWith('-outline') ? this.name() : `${this.name()}-outline`,
  );
}
