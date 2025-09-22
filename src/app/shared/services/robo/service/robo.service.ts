import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MOCK_ME } from 'mocks/me.mocks';
import { MOCK_STEUP } from 'mocks/steup.mocks';
import { MOCK_WALLETS } from 'mocks/wallets.mocks';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMe } from '../interface/me.interface';
import { ISetup } from '../interface/steup.interface';
import { IWallets } from '../interface/wallets.interface';

@Injectable()
export class RoboService {
  private _http = inject(HttpClient);

  wallets(): Observable<IWallets[]> {
    if (!environment.production) return of(MOCK_WALLETS as any);
    return this._http.get<IWallets[]>(`${environment.bot}/users/wallets`);
  }

  me(): Observable<IMe> {
    if (!environment.production) return of(MOCK_ME as any);
    return this._http.get<IMe>(`${environment.bot}/users/auth/me`);
  }
  setups(userId: string): Observable<ISetup> {
    if (!environment.production) return of(MOCK_STEUP as any);
    return this._http.get<ISetup>(
      `${environment.bot}/users/setups?page=1&pageSize=100&orderBy=id&orderDirection=DESC&userId=${userId}&active=true`,
    );
  }

  active(id: string): Observable<void> {
    return this._http.get<void>(`${environment.bot}/users/setups/${id}/active`);
  }
  disabled(id: string): Observable<void> {
    return this._http.get<void>(
      `${environment.bot}/users/setups/${id}/inactive`,
    );
  }

  transferBonus(data: {
    amount: string;
    walletDestinationId: string;
    walletOriginId: string;
  }): Observable<any> {
    return this._http.post<void>(
      `${environment.bot}/users/wallets/transfer`,
      data,
    );
  }

  tradesByInterval(
    interval: 'WEEK' | 'MONTH' | 'YEAR',
  ): Observable<{ date: string; total: number }[]> {
    return this._http.get<{ date: string; total: number }[]>(
      `${environment.bot}/performance/time-series?interval=${interval}&type=OPERATIONAL`,
    );
  }
}
