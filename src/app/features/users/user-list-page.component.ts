import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, startWith } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UsersActions } from './state/users.actions';
import { selectAllUsers, selectUsersError, selectUsersLoading } from './state/users.selectors';
import { User } from '../../models/user.model';
import { UserFormDialogComponent, UserFormDialogData } from './user-form-dialog.component';

@Component({
  selector: 'app-user-list-page',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListPageComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  readonly nameFilter = new FormControl('', { nonNullable: true });

  readonly vm$ = combineLatest([
    this.store.select(selectAllUsers),
    this.store.select(selectUsersLoading),
    this.store.select(selectUsersError),
    this.nameFilter.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      distinctUntilChanged(),
    ),
  ]).pipe(
    map(([users, loading, error, term]) => ({
      users: users.filter((u) =>
        u.name.toLowerCase().includes(String(term ?? '').trim().toLowerCase()),
      ),
      loading,
      error,
    })),
  );

  ngOnInit(): void {
    this.store.dispatch(UsersActions.load());
  }

  openCreate(): void {
    this.openForm({});
  }

  edit(user: User): void {
    this.openForm({ user });
  }

  private openForm(data: UserFormDialogData): void {
    this.dialog.open(UserFormDialogComponent, {
      width: '520px',
      data,
    });
  }
}
