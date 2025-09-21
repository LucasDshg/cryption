import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonicComponentsModule } from '../../ionic-components.module';

type TTypeLoading =
  | 'iconLeft'
  | 'iconCenter'
  | 'iconLeft2'
  | 'threeText'
  | 'twoText'
  | 'oneText'
  | 'titleAndSubtitle';

@Component({
  selector: 'app-card-loading',
  templateUrl: './card-loading.component.html',
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  imports: [CommonModule, IonicComponentsModule],
})
export class CardLoadingComponent {
  readonly css = input<string>('');
  readonly showTitle = input<boolean>(false);
  readonly showSubtitle = input<boolean>(false);
  readonly type = input.required<TTypeLoading | undefined>();
}
