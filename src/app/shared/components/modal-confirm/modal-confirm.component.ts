import { Component, inject, input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { IonicComponentsModule } from '../../ionic-components.module';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styles: [
    `
      ion-modal {
        --width: auto;
      }
    `,
  ],
  imports: [IonicComponentsModule],
  providers: [ModalController],
})
export class ModalConfirmComponent {
  private _modalCtrl = inject(ModalController);
  readonly title = input<string>();
  readonly subtitle = input<string>('Esta ação não pode ser desfeita');
  readonly actionBtn = input<string>('confirmar');

  dismiss(confirme: boolean): void {
    this._modalCtrl.dismiss(confirme);
  }
}
