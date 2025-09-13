import { Routes } from '@angular/router';

import { MenuComponent } from './core/components/menu/menu.component';
import { HOME_ROUTES } from './module/home/home.routes';

export const APP_ROUTES: Routes = [
  // {
  //   path: 'auth',
  //   component: AppComponent,
  //   children: AUTH_ROUTES,
  // },
  {
    path: '',
    component: MenuComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: 'home',
        children: HOME_ROUTES,
      },
      // {
      //   path: 'cart',
      //   loadChildren: () =>
      //     import('./module/cart/cart.routes').then((m) => m.CART_ROUTES),
      // },
    ],
  },
];
