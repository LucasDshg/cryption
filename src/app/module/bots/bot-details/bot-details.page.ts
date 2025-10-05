import { CommonModule, Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular/standalone';
import { finalize, switchMap } from 'rxjs';
import { AppIconComponent } from 'src/app/shared/components/app-icon/app-icon.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { ISetupDataPartial } from 'src/app/shared/services/robo/interface/steup.interface';
import { RoboService } from 'src/app/shared/services/robo/service/robo.service';
import { UserBotsService } from 'src/app/shared/services/user-bots/user-bots.service';

@Component({
  selector: 'app-bot-details',
  templateUrl: './bot-details.page.html',
  imports: [
    IonicComponentsModule,
    CommonModule,
    HeaderComponent,
    AppIconComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserBotsService, NavController, RoboService],
})
export class BotDetailsPage {
  private _router = inject(NavController);
  private _loading = inject(LoadingController);
  private _userBotService = inject(UserBotsService);
  private _roboService = inject(RoboService);
  readonly state = inject(Location).getState() as { item: ISetupDataPartial };
  readonly loading = signal<boolean>(false);

  async toggle(): Promise<void> {
    if (this.state.item.active) {
      const loadingComp = await this._showLoading('Desligando o robô...');
      loadingComp.present();
      this._roboService
        .disabled(this.state.item.id)
        .pipe(
          switchMap(() =>
            this._userBotService.toggleStatus(this.state.item.id, false),
          ),
          finalize(() => loadingComp.dismiss()),
        )
        .subscribe(() => this._back());
    } else {
      const loadingComp = await this._showLoading('Ligando o robô...');
      loadingComp.present();
      this._roboService
        .active(this.state.item.id)
        .pipe(
          switchMap(() =>
            this._userBotService.toggleStatus(this.state.item.id, true),
          ),
          finalize(() => loadingComp.dismiss()),
        )
        .subscribe(() => this._back());
    }
  }

  async toggleReactivate(): Promise<void> {
    this._userBotService
      .toggleReactivate(this.state.item.id, !this.state.item.reactivate)
      .subscribe(() => this._back());
  }

  remove(): void {
    this._userBotService
      .remove(this.state.item.id)
      .subscribe(() => this._back());
  }

  save(): void {
    this._userBotService
      .insert({ ...this.state.item, description: 'Salvo no banco' })
      .subscribe(() => this._back());
  }

  back(): void {
    this._back();
  }

  private async _showLoading(text: string): Promise<HTMLIonLoadingElement> {
    const loadingComp = await this._loading.create({
      message: text,
    });
    loadingComp.prepend();
    return loadingComp;
  }
  private _back(): void {
    this._router.navigateBack('/bots');
  }
}
