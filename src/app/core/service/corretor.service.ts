import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MOCK_TRADES_INFO } from 'mocks/trades-info.mocks';
import { MOCK_TRADES } from 'mocks/trades.mock';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITrades } from '../interfaces/trades.interface';

@Injectable()
export class CorretoraService {
  private _http = inject(HttpClient);

  trades(data: { start: Date; end: Date }): Observable<ITrades> {
    if (!environment.production)
      return of(MOCK_TRADES as any).pipe(
        map((res: ITrades) => {
          const data = res.data.map((it) => {
            return {
              ...it,
              amount:
                it.fromBot && it.result === 'WON' ? it.amount / 2 : it.amount,
            };
          });
          return {
            ...res,
            data,
          };
        }),
      );
    return this._http.get<ITrades>(`${environment.corretora}/trades`, {
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

  tradesInfo(data: { start: Date; end: Date }): Observable<any> {
    if (!environment.production) return of(MOCK_TRADES_INFO as any);
    return this._http.get<{ token: string }>(
      `${environment.corretora}/trades/info`,
      {
        params: {
          startDate: data.start.toISOString(),
          endDate: data.end.toISOString(),
        },
      },
    );
  }
}
