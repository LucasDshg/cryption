import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { HOME_ROUTES } from './module/home/home.routes';
import { LoginPage } from './module/login/login.page';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
    data: { showTab: false },
  },
  {
    path: 'home',
    children: HOME_ROUTES,
    canActivate: [authGuard],
  },
  {
    path: 'trades',
    loadChildren: () =>
      import('./module/trades/trades.routes').then((m) => m.TRADES_ROUTES),
    canActivate: [authGuard],
  },
];
