import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ModalController } from '@ionic/angular/standalone';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { WITHDRAWALS_STATUS_DIC } from 'src/app/shared/services/corretora/constants/trades.constants';
import { IWithdrawalsItem } from 'src/app/shared/services/corretora/interface/withdrawals.interface';
import { CorretoraService } from 'src/app/shared/services/corretora/service/corretor.service';
import { ModalWithdrawalsDetailsComponent } from '../modal-details-withdrawals/modal-details-withdrawals.component';

@Component({
  selector: 'app-tab-saque',
  template: ` @defer (when data()) {
      @for (item of data()?.data; track item.id) {
        <ion-card class="ion-no-shadow" [button]="true" (click)="details(item)">
          <ion-card-content>
            <div
              class="ion-d-flex ion-justify-content-between ion-align-content-center"
            >
              <div class="ion-d-flex ion-flex-column ion-gap-8">
                <ion-text color="primary">
                  <p class="ion-m-bottom-0 ion-fw-medium">
                    {{ item.amount | currency }}
                  </p>
                </ion-text>
                <ion-text color="medium">
                  <small>Taxa: {{ item.feeAmount | currency }}</small>
                </ion-text>
              </div>
              <div
                class="ion-d-flex ion-flex-column ion-align-items-end ion-gap-8"
              >
                @if (withdrawalsDic.get(item.status); as withdrawals) {
                  <ion-badge class="ion-d-block" [color]="withdrawals.color">{{
                    withdrawals.name
                  }}</ion-badge>
                }
                <ion-text color="medium">
                  <small>{{ item.updatedAt | date }}</small>
                </ion-text>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      }
    } @placeholder {
      <app-card-loading type="titleAndSubtitle"></app-card-loading>
      <app-card-loading type="titleAndSubtitle"></app-card-loading>
      <app-card-loading type="titleAndSubtitle"></app-card-loading>
    }`,
  imports: [
    IonicComponentsModule,
    CardLoadingComponent,
    CurrencyPipe,
    DatePipe,
  ],
  providers: [CorretoraService],
})
export class TabSaqueComponent {
  private _corretoraService = inject(CorretoraService);
  private _modalCtrl = inject(ModalController);

  readonly data = toSignal(this._corretoraService.withdrawals());

  readonly withdrawalsDic = WITHDRAWALS_STATUS_DIC;

  async details(data: IWithdrawalsItem): Promise<void> {
    const modal = await this._modalCtrl.create({
      component: ModalWithdrawalsDetailsComponent,
      componentProps: {
        data,
      },
      initialBreakpoint: 1,
      breakpoints: [0, 1],
    });
    await modal.present();
  }
}
