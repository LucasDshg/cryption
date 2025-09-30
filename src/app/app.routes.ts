import { Routes } from '@angular/router';

import { authGuard } from './core/auth/guards/auth.guard';
import { AUTH_ROUTES } from './core/auth/pages/auth.routes';
import { HOME_ROUTES } from './module/home/home.routes';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: AUTH_ROUTES,
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
  {
    path: 'bots',
    loadChildren: () =>
      import('./module/bots/bots.routes').then((m) => m.BOTS_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: 'wallet',
    loadChildren: () =>
      import('./module/wallets/wallets.routes').then((m) => m.WALLETS_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: 'bonus',
    loadChildren: () =>
      import('./module/bonus/bonus.routes').then((m) => m.BONUS_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: 'corretora',
    loadChildren: () =>
      import('./module/corretora/corretora.routes').then(
        (m) => m.CORRETORA_ROUTES,
      ),
    canActivate: [authGuard],
  },
];
