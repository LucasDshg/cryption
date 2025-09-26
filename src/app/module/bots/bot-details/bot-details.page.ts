import { CommonModule, Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { AppIconComponent } from 'src/app/shared/components/app-icon/app-icon.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { ISetupData } from 'src/app/shared/services/robo/interface/steup.interface';
import { UserBotsService } from 'src/app/shared/services/user-bots.service';

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
  providers: [UserBotsService, NavController],
})
export class BotDetailsPage {
  private _router = inject(NavController);
  private _userBotService = inject(UserBotsService);
  readonly state = inject(Location).getState() as { item: ISetupData };
  readonly loading = signal<boolean>(false);

  toggle(): void {
    if (this.state.item.active) {
      this._userBotService
        .toggleStatus(this.state.item.id, false)
        .subscribe(() => this._back());
    } else {
      this._userBotService
        .toggleStatus(this.state.item.id, false)
        .subscribe(() => this._back());
    }
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

  private _back(): void {
    this._router.navigateBack('/bots');
  }
}
