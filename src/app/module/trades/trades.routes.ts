import { Routes } from '@angular/router';
import { TradesPage } from './trades.page';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TRADES_ROUTES: Routes = [
  {
    path: '',
    component: TradesPage,
    data: { showTab: true },
  },
];
