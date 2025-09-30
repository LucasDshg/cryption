import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MOCK_BOT_TYPE } from 'mocks/bots-type.mocks';
import { MOCK_ME } from 'mocks/me.mocks';
import { MOCK_STEUP } from 'mocks/steup.mocks';
import { MOCK_WALLETS } from 'mocks/wallets.mocks';
import { delay, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBotsType } from '../interface/bots-type.interface';
import { IDepositPix } from '../interface/deposit.interface';
import { IMe } from '../interface/me.interface';
import { ISetup } from '../interface/steup.interface';
import { ITransactions } from '../interface/transactions.interface';
import { IWallets } from '../interface/wallets.interface';
import { MOCK_TRANSACTIONS } from 'mocks/transactions.mocks';

@Injectable()
export class RoboService {
  private _http = inject(HttpClient);

  wallets(): Observable<IWallets[]> {
    if (!environment.production)
      return of(MOCK_WALLETS).pipe(delay(environment.delay));
    return this._http.get<IWallets[]>(`${environment.bot}/users/wallets`);
  }

  me(): Observable<IMe> {
    if (!environment.production)
      return of(MOCK_ME).pipe(delay(environment.delay));
    return this._http.get<IMe>(`${environment.bot}/users/auth/me`);
  }
  setups(userId: string): Observable<ISetup> {
    if (!environment.production)
      return of(MOCK_STEUP).pipe(delay(environment.delay));
    return this._http.get<ISetup>(
      `${environment.bot}/users/setups?page=1&pageSize=100&orderBy=id&orderDirection=DESC&userId=${userId}&active=true`,
    );
  }

  transactions(userId: string, walletId: string): Observable<ITransactions> {
    if (!environment.production)
      return of(MOCK_TRANSACTIONS).pipe(delay(environment.delay));
    return this._http.get<ITransactions>(
      `${environment.bot}/users/transactions?page=1&pageSize=10&userId=${userId}&orderBy=id&walletId=${walletId}&orderDirection=DESC`,
    );
  }
  addBot(data: {
    name: string;
    value: number;
    botId: string;
    brokerToken: string;
  }): Observable<void> {
    return this._http.post<void>(`${environment.bot}/users/setups`, {
      name: data.name,
      brokerProfileId: data.botId,
      brokerToken: data.brokerToken,
      description: '',
      brokerMaxBalanceToUse: data.value,
    });
  }

  fetchTypeBots(): Observable<IBotsType> {
    if (!environment.production) return of(MOCK_BOT_TYPE);
    return this._http.get<IBotsType>(
      `${environment.bot}/users/profile-type?page=1&pageSize=100&brokerId=01JFGCZ9SJ579HFCC9WTJBE21B&orderDirection=DESC&active=true`,
    );
  }
  active(id: string): Observable<void> {
    return this._http.post<void>(
      `${environment.bot}/users/setups/${id}/active`,
      {},
    );
  }
  disabled(id: string): Observable<void> {
    return this._http.post<void>(
      `${environment.bot}/users/setups/${id}/inactive`,
      {},
    );
  }

  transferBonus(data: {
    amount: string | number;
    walletDestinationId: string;
    walletOriginId: string;
  }): Observable<any> {
    return this._http.post<void>(
      `${environment.bot}/users/wallets/transfer`,
      data,
    );
  }

  depositPix(data: {
    amount: string | number;
    documentNumber: string;
  }): Observable<IDepositPix> {
    return this._http.post<IDepositPix>(
      `${environment.bot}/deposits/pix`,
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
