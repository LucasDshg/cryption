import { DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  enableProdMode,
  provideZonelessChangeDetection,
} from '@angular/core';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  Auth,
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  provideAuth,
} from '@angular/fire/auth';
import { initializeFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';
import { Capacitor } from '@capacitor/core';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localePt);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { timezone: 'pt-br', dateFormat: 'dd/MM/yyyy' },
    },
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    // provideHttpClient(withInterceptors([authInterceptor])),
    provideIonicAngular({
      swipeBackEnabled: true,
      mode: 'md',
      animated: true,
      useSetInputAPI: true,
      scrollAssist: true,
    }),
    provideRouter(
      APP_ROUTES,
      withComponentInputBinding(),
      // withDebugTracing(),
      withPreloading(PreloadAllModules),
    ),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => whichAuth()),
    provideAnalytics(() => getAnalytics()),
    provideStorage(() => {
      const app = getApp();
      return getStorage(app);
    }),
    provideFirestore(() => {
      const app = getApp();
      return initializeFirestore(
        app,
        environment.production
          ? {}
          : {
              host: 'localhost:8080',
              ssl: false,
              experimentalAutoDetectLongPolling: true,
            },
        environment.dataBase,
      );
    }),
  ],
});

function whichAuth(): Auth {
  let auth;
  if (Capacitor.isNativePlatform()) {
    auth = initializeAuth(getApp(), {
      persistence: indexedDBLocalPersistence,
    });
  } else {
    auth = getAuth();
  }
  return auth;
}
