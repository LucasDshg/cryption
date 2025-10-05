import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { combineLatest, map } from 'rxjs';
import { UserStore } from 'src/app/core/store/user.store';
import { AppIconComponent } from 'src/app/shared/components/app-icon/app-icon.component';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { UserBotsService } from 'src/app/shared/services//user-bots/user-bots.service';
import {
  ISetupData,
  ISetupDataPartial,
} from 'src/app/shared/services/robo/interface/steup.interface';
import { RoboService } from 'src/app/shared/services/robo/service/robo.service';

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
  providers: [RoboService, NavController, UserBotsService],
})
export class BotsPage {
  private _roboService = inject(RoboService);
  private _userBotService = inject(UserBotsService);

  private _store = inject(UserStore);
  private _router = inject(NavController);

  readonly data = signal<ISetupDataPartial[] | undefined>(undefined);

  ionViewDidEnter(): void {
    this._getData();
  }

  goToDetails(item: ISetupDataPartial): void {
    this._router.navigateForward(['/bots', 'details'], { state: { item } });
  }
  goToNewBot(): void {
    this._router.navigateForward(['/bots', 'new']);
  }

  private _getData(): void {
    combineLatest([
      this._userBotService.fetch(),
      this._roboService.setups(this._store.store()!.robo.id),
    ])
      .pipe(
        map((res) => {
          const bots = res[1].data as unknown as ISetupDataPartial[];
          const dbBot = res[0];
          if (dbBot.length === 3) {
            return dbBot.map((it) => {
              return {
                ...it,
                profit: bots.find((bot) => bot.id === it.id)?.profit,
              } as ISetupData;
            });
          } else {
            const filterBost = bots.filter(
              (bot) => !dbBot.map((db) => db.id).includes(bot.id),
            );
            return filterBost.concat(dbBot) as ISetupDataPartial[];
          }
        }),
      )
      .subscribe((res) => this.data.set(res!));
  }
}
