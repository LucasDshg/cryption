import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MOCK_TRADES_INFO } from 'mocks/trades-info.mocks';
import { MOCK_TRADES } from 'mocks/trades.mocks';
import { delay, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITradeInfo } from '../interface/trade-info.interface';
import { ITrades } from '../interface/trades.interface';
import { IUserToken } from '../interface/user-token.interface';

@Injectable()
export class CorretoraService {
  private _http = inject(HttpClient);

  trades(data: { start: Date; end: Date }): Observable<ITrades> {
    let request: Observable<ITrades>;
    if (!environment.production) {
      request = of(MOCK_TRADES as any).pipe(delay(2000));
    } else {
      request = this._http.get<ITrades>(`${environment.corretora}/trades`, {
        params: {
          page: 1,
          pageSize: 200,
          startDate: data.start.toISOString(),
          endDate: data.end.toISOString(),
          isDemo: false,
          orderBy: 'closeTime',
          orderDirection: 'DESC',
        },
      });
    }

    return request.pipe(
      map((res: ITrades) => {
        const data = res.data.map((it) => {
          let pnl: number = it.pnl;
          if (it.fromBot) {
            switch (it.result) {
              case 'DRAW':
                pnl = it.amount;
                break;
              case 'WON':
                pnl = it.pnl / 2;
                break;
            }
          }
          it.syncOpensearchAt = new Date(
            (it.syncOpensearchAt as string).split('.')[0],
          );
          return { ...it, pnl };
        });
        return {
          ...res,
          data,
        };
      }),
    );
  }

  tradesInfo(data: { start: Date; end: Date }): Observable<ITradeInfo> {
    if (!environment.production)
      return of(MOCK_TRADES_INFO as any).pipe(delay(2000));
    return this._http.get<ITradeInfo>(`${environment.corretora}/trades/info`, {
      params: {
        startDate: data.start.toISOString(),
        endDate: data.end.toISOString(),
      },
    });
  }

  userTokes(): Observable<IUserToken> {
    if (!environment.production)
      return of(MOCK_TRADES_INFO as any).pipe(delay(2000));
    return this._http.get<IUserToken>(
      `${environment.corretora}/user-api-tokens?page=1&pageSize=10&orderBy=id&orderDirection=DESC`,
    );
  }
}
