import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/users/user-list-page.component').then((m) => m.UserListPageComponent),
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./features/todos/todo-page.component').then((m) => m.TodoPageComponent),
  },
  {
    path: 'challenges',
    loadComponent: () =>
      import('./challenges/challenges-layout.component').then((m) => m.ChallengesLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'search' },
      {
        path: 'search',
        loadComponent: () =>
          import('./challenges/reactive-search-demo/reactive-search-demo.component').then(
            (m) => m.ReactiveSearchDemoComponent,
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./challenges/cart-signals/cart-signals-demo.component').then(
            (m) => m.CartSignalsDemoComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
