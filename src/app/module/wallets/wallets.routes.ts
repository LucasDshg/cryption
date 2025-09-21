import { Routes } from '@angular/router';
import { WalletsPage } from './wallets.page';

export const WALLETS_ROUTES: Routes = [
  {
    path: '',
    component: WalletsPage,
    data: { showTab: true },
  },
];
