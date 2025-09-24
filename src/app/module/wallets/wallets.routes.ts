import { Routes } from '@angular/router';
import { WalletsPage } from './wallets.page';

export const WALLETS_ROUTES: Routes = [
  {
    path: '',
    component: WalletsPage,
    data: { showTab: true },
  },
  {
    path: 'alert',
    loadComponent: () =>
      import('./alert-wallets/alert-wallets.page').then(
        (m) => m.AlertWalletsPage,
      ),
    data: { showTab: false },
  },
];
