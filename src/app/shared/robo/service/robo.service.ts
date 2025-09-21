import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMe } from '../interface/me.interface';
import { ISetup } from '../interface/steup.interface';
import { IWallets } from '../interface/wallets.interface';

@Injectable()
export class RoboService {
  private _http = inject(HttpClient);

  wallets(): Observable<IWallets[]> {
    return this._http.get<IWallets[]>(`${environment.bot}/users/wallets`);
  }

  me(): Observable<IMe> {
    return this._http.get<IMe>(`${environment.bot}/users/auth/me`);
  }
  setups(userId: string): Observable<ISetup> {
    return this._http.get<ISetup>(
      `${environment.bot}/users/setups?page=1&pageSize=100&orderBy=id&orderDirection=DESC&userId=${userId}&active=true`,
    );
  }
}
