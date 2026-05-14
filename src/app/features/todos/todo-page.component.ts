import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { TodosActions } from './state/todos.actions';
import { selectAllTodos, selectPendingTodos } from './state/todos.selectors';
import { todosFeature } from './state/todos.reducer';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    AsyncPipe,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent implements OnInit {
  private readonly store = inject(Store);

  readonly vm$ = combineLatest([
    this.store.select(selectAllTodos),
    this.store.select(selectPendingTodos),
    this.store.select(todosFeature.selectLoading),
    this.store.select(todosFeature.selectError),
  ]).pipe(map(([all, pending, loading, error]) => ({ all, pending, loading, error })));

  ngOnInit(): void {
    this.store.dispatch(TodosActions.loadTodos());
  }

  toggle(id: string): void {
    this.store.dispatch(TodosActions.toggleTodoComplete({ id }));
  }

  reload(): void {
    this.store.dispatch(TodosActions.loadTodos());
  }
}
