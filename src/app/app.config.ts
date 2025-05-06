import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth0 } from '@auth0/auth0-angular';


import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AuthInterceptor } from './interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', subscriptSizing: 'dynamic' } },
    provideAuth0({
      domain: 'dev-crbw8cd1x7ah3xbx.us.auth0.com',
      clientId: '0P3af147Vqg5rfqXha2vfe7tv8GTk4xf',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-crbw8cd1x7ah3xbx.us.auth0.com/api/v2/',
      }
    }),
  ]
};
