import { Routes } from '@angular/router';
import { HomePage } from './home.page';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomePage,
    data: { showTab: true },
  },
];
