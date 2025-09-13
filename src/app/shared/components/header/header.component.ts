import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { IonicComponentsModule } from '../../ionic-components.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
      :host {
        z-index: 0;
      }
    `,
  ],
  imports: [IonicComponentsModule, CommonModule],
})
export class HeaderComponent {
  readonly leftIconEvent = output<boolean>();

  readonly title = input<string>();
  readonly content = input<boolean>(false);
  readonly iconLeft = input<string | undefined>();

  leftIconClick(): void {
    this.leftIconEvent.emit(true);
  }
}
