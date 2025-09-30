import { Routes } from '@angular/router';
import { CorretoraPage } from './corretora.page';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CORRETORA_ROUTES: Routes = [
  {
    path: '',
    component: CorretoraPage,
    data: { showTab: false },
  },
];
