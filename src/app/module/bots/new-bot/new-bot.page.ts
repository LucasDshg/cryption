import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { MaskitoDirective } from '@maskito/angular';
import { UserStore } from 'src/app/core/store/user.store';
import { AppIconComponent } from 'src/app/shared/components/app-icon/app-icon.component';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { RoboService } from 'src/app/shared/services/robo/service/robo.service';
import { mask } from 'src/app/utils/mask.utils';

@Component({
  selector: 'app-new-bot',
  templateUrl: './new-bot.page.html',
  imports: [
    IonicComponentsModule,
    CommonModule,
    HeaderComponent,
    CardLoadingComponent,
    AppIconComponent,
    FormsModule,
    ReactiveFormsModule,
    MaskitoDirective,
  ],
  providers: [RoboService, NavController],
})
export class NewBotPage {
  private _store = inject(UserStore);
  private _router = inject(NavController);

  readonly masks = mask;
  readonly loading = signal<boolean>(false);

  ionViewDidEnter(): void {}

  submit(): void {}

  private _back(): void {
    this._router.navigateBack('/wallet');
  }
}
