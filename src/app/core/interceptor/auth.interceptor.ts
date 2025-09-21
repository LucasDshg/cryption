import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const auth = inject(AuthService);
  const store = auth['_store'].store();
  let newReq: HttpRequest<any> = req.clone({
    setHeaders: {
      'Content-Type': 'application/json;charset=UTF-8',
      'x-timestamp': '1757455588508',
    },
    body: JSON.stringify(req.body),
  });

  if (req.url.includes('/auth/login')) {
    return next(newReq);
  }

  if (req.url.includes(environment.corretora)) {
    if (store?.corretora) {
      if (auth.isTokenExpired(store!.corretora!)) {
        auth.logout();
        return throwError(() => new Error('Login expirado'));
      }

      newReq = _setAcessToken(newReq, store!!.corretora);
    }
  } else if (req.url.includes(environment.bot)) {
    if (store?.bot) {
      if (auth.isTokenExpired(store!.bot!)) {
        auth.logout();
        return throwError(() => new Error('Login expirado'));
      }

      newReq = _setAcessToken(newReq, store!!.bot);
    }
  } else {
    auth.logout();
  }

  return next(newReq);
};

function _setAcessToken(
  req: HttpRequest<any>,
  token: string,
): HttpRequest<any> {
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
}
