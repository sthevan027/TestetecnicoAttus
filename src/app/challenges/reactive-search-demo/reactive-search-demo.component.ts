import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { User } from '../../models/user.model';
import { ReactiveSearchService } from './reactive-search.service';

@Component({
  selector: 'app-reactive-search-demo',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    RouterLink,
  ],
  templateUrl: './reactive-search-demo.component.html',
  styleUrl: './reactive-search-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveSearchDemoComponent {
  private readonly searchService = inject(ReactiveSearchService);

  readonly query = new FormControl('', { nonNullable: true });
  readonly loading = signal(false);

  readonly results$: Observable<User[]> = this.query.valueChanges.pipe(
    startWith(this.query.value),
    debounceTime(500),
    map((v) => v.trim()),
    distinctUntilChanged(),
    switchMap((term) => {
      this.loading.set(true);
      return this.searchService.search(term).pipe(
        finalize(() => this.loading.set(false)),
        catchError(() => of([] as User[])),
      );
    }),
  );
}
