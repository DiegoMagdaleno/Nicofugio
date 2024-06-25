import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr(),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'nicofugio',
        appId: '1:250859620064:web:62c413e393871aec623285',
        storageBucket: 'nicofugio.appspot.com',
        apiKey: 'AIzaSyCVUtPbMirdIfnSzHz8-ldgUZ3lv1Kk5ec',
        authDomain: 'nicofugio.firebaseapp.com',
        messagingSenderId: '250859620064',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
