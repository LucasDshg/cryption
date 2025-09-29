import { Component, inject, signal } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { CorretoraService } from 'src/app/shared/services/corretora/service/corretor.service';
import { TabDepositComponent } from './components/tab-deposit.component';
import { TabSaqueComponent } from './components/tab-saque.component';
import { TabsComponent } from './components/tabs.component';

@Component({
  selector: 'app-corretora',
  templateUrl: './corretora.page.html',
  imports: [
    IonicComponentsModule,
    HeaderComponent,
    TabsComponent,
    TabSaqueComponent,
    TabDepositComponent,
  ],
  providers: [CorretoraService, NavController],
})
export class CorretoraPage {
  private _router = inject(NavController);

  readonly tabSelected = signal<'SAQUES' | 'DEPOSIT'>('SAQUES');

  toggleTab(value: 'SAQUES' | 'DEPOSIT'): void {
    this.tabSelected.set(value);
  }

  back(): void {
    this._back();
  }

  private _back(): void {
    this._router.navigateBack('/wallet');
  }
}
