import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';
import { UserStore } from '../store/user.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private _store = inject(UserStore);
  private _router = inject(Router);

  get isLogged(): boolean {
    const auth = this._store.store();

    if (!auth) return false;
    return (
      !this.isTokenExpired(auth!.tokens.bot) ||
      !this.isTokenExpired(auth!.tokens.corretora)
    );
  }

  login(key: string, code: string): Observable<IUser> {
    return this._http.post<IUser>(`${environment.api}/login`, { key, code });
  }

  logout(): void {
    this._store.clear();
    this._router.navigateByUrl('/login');
  }

  account(data: IUser): Observable<{ key: string }> {
    return this._http.post<{ key: string }>(`${environment.api}/account`, data);
  }

  isTokenExpired = (token: string): boolean =>
    new JwtHelperService().isTokenExpired(token);
}
