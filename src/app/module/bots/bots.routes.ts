import { Routes } from '@angular/router';
import { BotsPage } from './bots.page';

export const BOTS_ROUTES: Routes = [
  {
    path: '',
    component: BotsPage,
    data: { showTab: true },
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./new-bot/new-bot.page').then((m) => m.NewBotPage),
    data: { showTab: false },
  },
];
