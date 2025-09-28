import { CommonModule, Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { MaskitoDirective } from '@maskito/angular';
import { finalize, switchMap } from 'rxjs';
import { UserStore } from 'src/app/core/store/user.store';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { RoboService } from 'src/app/shared/services/robo/service/robo.service';
import { mask } from 'src/app/utils/mask.utils';
import { parseToFloat } from 'src/app/utils/utils.function';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.page.html',
  imports: [
    IonicComponentsModule,
    CommonModule,
    HeaderComponent,
    CardLoadingComponent,
    FormsModule,
    ReactiveFormsModule,
    MaskitoDirective,
  ],
  providers: [RoboService, NavController],
})
export class BonusPage {
  private _store = inject(UserStore);
  private _roboService = inject(RoboService);
  private _router = inject(NavController);

  readonly masks = mask;

  readonly state = inject(Location).getState() as {
    bonus: number;
  };
  readonly loading = signal<boolean>(false);

  controlValue = new FormControl<number>(0, [
    Validators.required,
    Validators.min(1),
  ]);

  ionViewDidEnter(): void {
    this.controlValue.setValue(this.state.bonus);
    this.controlValue.addValidators(Validators.max(this.state.bonus));
  }

  submit(): void {
    if (this.controlValue.invalid) {
      this.controlValue.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this._roboService
      .wallets()
      .pipe(
        switchMap((wallets) => {
          return this._roboService.transferBonus({
            amount: parseToFloat(this.controlValue.value!.toString()),
            walletDestinationId: wallets[0].id,
            walletOriginId: wallets[1].id,
          });
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe(() => this._back());
  }

  private _back(): void {
    this._router.navigateBack('/wallet');
  }
}
