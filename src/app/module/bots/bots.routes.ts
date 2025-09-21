import { Routes } from '@angular/router';
import { BotsPage } from './bots.page';

export const BOTS_ROUTES: Routes = [
  {
    path: '',
    component: BotsPage,
    data: { showTab: true },
  },
];
