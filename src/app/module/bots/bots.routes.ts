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
  {
    path: 'details',
    loadComponent: () =>
      import('./bot-details/bot-details.page').then((m) => m.BotDetailsPage),
    data: { showTab: false },
  },
  {
    path: 'deposit',
    loadComponent: () =>
      import('./bot-deposit/bot-deposit.page').then((m) => m.BotDepositPage),
    data: { showTab: false },
  },
];
