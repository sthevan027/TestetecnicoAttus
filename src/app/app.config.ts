import { ApplicationConfig, isDevMode, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { mockApiInterceptor } from './mocks/mock-api.interceptor';
import { usersFeature } from './features/users/state/users.reducer';
import { todosFeature } from './features/todos/state/todos.reducer';
import { UsersEffects } from './features/users/state/users.effects';
import { TodosEffects } from './features/todos/state/todos.effects';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([mockApiInterceptor])),
    provideStore(),
    provideState(usersFeature),
    provideState(todosFeature),
    provideEffects(UsersEffects, TodosEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
