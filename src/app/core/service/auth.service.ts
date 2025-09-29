import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { from, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuth, IBot, ICorretora } from '../interfaces/user.interface';
import { UserStore } from '../store/user.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authFire = inject(Auth);
  private _http = inject(HttpClient);
  private _store = inject(UserStore);
  private _router = inject(Router);

  get isLogged(): boolean {
    const auth = this._store.store();

    if (!auth) return false;
    return (
      !this.isTokenExpired(auth!.tokenBot) ||
      !this.isTokenExpired(auth!.tokenCorretora)
    );
  }

  login(
    key: string,
    code: string,
  ): Observable<{ corretora: ICorretora; bot: IBot }> {
    return this.signInWithEmail(code).pipe(
      switchMap(() => {
        return this._http.post<{
          corretora: ICorretora;
          bot: IBot;
        }>(`${environment.api}/login`, { key, code });
      }),
      tap((res) =>
        this._store.update({
          credential: { corretora: res.corretora, robo: res.bot },
        }),
      ),
    );
  }

  createUser(code: number | string): Observable<any> {
    return from(
      createUserWithEmailAndPassword(
        this._authFire,
        `${code}@cryption.app.br`,
        'password_'.concat(code.toString()),
      ),
    );
  }

  signInWithEmail(code: string | number): Observable<any> {
    return from(
      signInWithEmailAndPassword(
        this._authFire,
        `${code}@cryption.app.br`,
        'password_'.concat(code.toString()),
      ),
    );
  }

  corretora(data: ICorretora): Observable<{ token: string }> {
    return this._http.post<{ token: string }>(
      `${environment.corretora}/auth/login`,
      data,
    );
  }

  robo(data: IBot): Observable<{ token: string }> {
    return this._http.post<{ token: string }>(
      `${environment.bot}/users/auth/login`,
      data,
    );
  }

  logout(): void {
    this._store.clear();
    this._router.navigateByUrl('/login');
  }

  account(data: IAuth): Observable<{ key: string }> {
    return this._http.post<{ key: string }>(`${environment.api}/account`, data);
  }

  isTokenExpired = (token: string): boolean =>
    new JwtHelperService().isTokenExpired(token);
}
