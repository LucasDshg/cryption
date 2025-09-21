import { Component, input, output } from '@angular/core';
import { IonicComponentsModule } from '../../ionic-components.module';

@Component({
  selector: 'app-card-error',
  template: `<ion-card>
    <ion-card-content>
      <ion-text color="dark">
        <ion-icon
          class="ion-fs-24"
          color="danger"
          name="close-circle-outline"
        ></ion-icon>
        <p class="ion-m-bottom-0">{{ text() }}</p>

        @if(btn()){
        <ion-button
          (click)="btnEvent.emit()"
          expand="block"
          fill="clear"
          shape="round"
          color="primary"
        >
          {{ btn() }}
        </ion-button>
        }
      </ion-text>
    </ion-card-content>
  </ion-card>`,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  imports: [IonicComponentsModule],
})
export class CardErrorComponent {
  readonly text = input.required<string>();
  readonly btn = input<string>();
  readonly btnEvent = output<void>();
}
