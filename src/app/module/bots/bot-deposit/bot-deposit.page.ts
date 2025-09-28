import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { MaskitoDirective } from '@maskito/angular';
import { UserStore } from 'src/app/core/store/user.store';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { RoboService } from 'src/app/shared/services/robo/service/robo.service';
import { mask } from 'src/app/utils/mask.utils';

@Component({
  selector: 'app-bot-deposit',
  templateUrl: './bot-deposit.page.html',
  imports: [
    IonicComponentsModule,
    CommonModule,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MaskitoDirective,
  ],
  providers: [RoboService, NavController],
})
export class BotDepositPage {
  private _store = inject(UserStore);
  private _router = inject(NavController);

  readonly masks = mask;
  readonly loading = signal<boolean>(false);
  readonly linkCreated = signal<boolean>(false);
  readonly tabSelected = signal<'EXTRATO' | 'DEPOSIT'>('DEPOSIT');

  controlValue = new FormControl<number>(0, [
    Validators.required,
    Validators.min(1),
  ]);

  ionViewDidEnter(): void {}

  copy(): void {}

  createLink(): void {
    this.controlValue.reset();
    this.linkCreated.set(true);
  }

  newLink(): void {
    this.linkCreated.set(false);
  }

  toggleTab(value: 'EXTRATO' | 'DEPOSIT'): void {
    this.tabSelected.set(value);
  }

  back(): void {
    this._back();
  }

  private _back(): void {
    this._router.navigateBack('/wallet');
  }
}
