import { Routes } from '@angular/router';
import { LoginPage } from './login/login.page';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginPage,
    data: { showTab: false },
  },
];
