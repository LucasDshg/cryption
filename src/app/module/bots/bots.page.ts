import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserStore } from 'src/app/core/store/user.store';
import { AppIconComponent } from 'src/app/shared/components/app-icon/app-icon.component';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { RoboService } from 'src/app/shared/robo/service/robo.service';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.page.html',
  imports: [
    IonicComponentsModule,
    CommonModule,
    HeaderComponent,
    CardLoadingComponent,
    AppIconComponent,
  ],
  providers: [RoboService],
})
export class BotsPage {
  private _roboService = inject(RoboService);
  private _store = inject(UserStore);

  readonly data = toSignal(
    this._roboService.setups(this._store.store()!.robo.id),
  );
}
