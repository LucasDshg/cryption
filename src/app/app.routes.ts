import { Routes } from '@angular/router';

import { HOME_ROUTES } from './module/home/home.routes';
import { LoginPage } from './module/login/login.page';

export const APP_ROUTES: Routes = [
  // {
  //   path: 'auth',
  //   component: AppComponent,
  //   children: AUTH_ROUTES,
  // },
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
  },
];
