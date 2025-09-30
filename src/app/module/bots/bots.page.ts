import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { map, switchMap } from 'rxjs';
import { UserStore } from 'src/app/core/store/user.store';
import { AppIconComponent } from 'src/app/shared/components/app-icon/app-icon.component';
import { CardLoadingComponent } from 'src/app/shared/components/card-loading/card-loading.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { ISetupData } from 'src/app/shared/services/robo/interface/steup.interface';
import { RoboService } from 'src/app/shared/services/robo/service/robo.service';
import { UserBotsService } from 'src/app/shared/services/user-bots.service';

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

  readonly data = signal<ISetupData[] | undefined>(undefined);

  ionViewDidEnter(): void {
    this._getData();
  }

  goToDetails(item: ISetupData): void {
    this._router.navigateForward(['/bots', 'details'], { state: { item } });
  }
  goToNewBot(): void {
    this._router.navigateForward(['/bots', 'new']);
  }

  private _getData(): void {
    this._userBotService
      .fetch()
      .pipe(
        switchMap((userBots) => {
          return this._roboService.setups(this._store.store()!.robo.id).pipe(
            map((bots) => {
              if (userBots.length > 0) {
                userBots.forEach((it) => {
                  const findById = bots.data.find((val) => val.id === it.id);
                  if (findById) {
                    it.profit = findById.profit;
                  }
                });

                return userBots;
              }
              return bots.data;
            }),
          );
        }),
      )
      .subscribe((res: ISetupData[]) => {
        this.data.set(res);
      });
  }
}
