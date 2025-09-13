import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { IComunication } from '../../comunication/interface/comunication.interface';
import { ComunicationService } from '../../comunication/service/comunication.service';

@Component({
  selector: 'app-card-comunication',
  template: ` @if (
    comunication() && comunication()!.dueDate!.getTime() > today.getTime()
  ) {
    <ion-card>
      <ion-card-content
        class="ion-d-flex ion-align-items-center ion-m-vertical-16"
      >
        <div class="ion-m-end-auto">
          <ion-card-title color="info" class="ion-margin-bottom">
            Comunicado!
          </ion-card-title>
          <ion-text color="dark">
            <small> {{ comunication()!.text }}</small>
          </ion-text>
        </div>
      </ion-card-content>
    </ion-card>
  }`,

  imports: [IonicComponentsModule],
  providers: [ComunicationService],
})
export class CardComunicationComponent {
  private _comunicationService = inject(ComunicationService);
  readonly today = new Date();
  readonly comunication = toSignal<IComunication | undefined>(
    this._comunicationService.fetchById('0'),
  );
}
