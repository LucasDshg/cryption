import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  ActivationStart,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { removeMask } from 'src/app/utils/utils.function';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
  imports: [
    IonRouterOutlet,
    IonicComponentsModule,
    RouterLink,
    RouterLinkActive,
  ],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          bottom: 0,
        }),
      ),
      state(
        'closed',
        style({
          bottom: -100,
        }),
      ),
      transition('open => closed', [animate('.3s')]),
      transition('closed => open', [animate('.3s')]),
    ]),
  ],
})
export class MenuComponent implements OnInit {
  private _router = inject(Router);
  private _cdr = inject(ChangeDetectorRef);

  readonly showTab = signal<boolean>(true);
  readonly activeTab = signal<string>('home');
  readonly menu = signal<{ path: string; icon: string }[]>([
    {
      icon: 'home',
      path: 'home',
    },
    {
      icon: 'reader',
      path: 'reader',
    },
  ]);

  ngOnInit(): void {
    this._router.events.subscribe((data) => {
      if (data instanceof ActivationStart) {
        if (data.snapshot.data['showTab'] !== undefined) {
          this.showTab.set(data.snapshot.data['showTab']);
          this._cdr.detectChanges();
        }
      }

      if (data instanceof NavigationEnd) {
        this.activeTab.set(removeMask(data.url)!);
        this._cdr.detectChanges();
      }
    });
  }
}
