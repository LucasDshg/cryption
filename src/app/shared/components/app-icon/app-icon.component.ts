import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicComponentsModule } from '../../ionic-components.module';

@Component({
  selector: 'app-icon',
  template: `<ion-icon [name]="iconName" [size]="size"></ion-icon>`,
  imports: [IonicComponentsModule, CommonModule],
  styleUrls: ['app-icon.component.scss'],
})
export class AppIconComponent {
  @Input() name!: string;
  @Input() size: string = 'large';

  get iconName(): string {
    return this.name.endsWith('-outline') ? this.name : `${this.name}-outline`;
  }
}
