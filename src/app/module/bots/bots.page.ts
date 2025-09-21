import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserStore } from 'src/app/core/store/user.store';
import { AppIconComponent } from 'src/app/shared/components/app-icon/app-icon.component';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ConfirmAlert } from 'src/app/shared/components/modal-confirm/confirm-alert-decorator';
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

  readonly data = rxResource({
    stream: () => this._roboService.setups(this._store.store()!.robo.id),
  });

  @ConfirmAlert({
    title: 'Deseja desligar o bot',
    keyArgs: 'name',
  })
  toggleStatus(name: string, active: boolean, id: string): void {
    if (active) {
      this._roboService.disabled(id).subscribe(() => this.data.reload());
    } else {
      this._roboService.active(id).subscribe(() => this.data.reload());
    }
  }
}
