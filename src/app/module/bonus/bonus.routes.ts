import { Routes } from '@angular/router';
import { BonusPage } from './bonus.page';

export const BONUS_ROUTES: Routes = [
  {
    path: '',
    component: BonusPage,
    data: { showTab: false },
  },
];
