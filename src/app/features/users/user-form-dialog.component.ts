import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { merge } from 'rxjs';
import { take } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User, UserDraft } from '../../models/user.model';
import { UsersActions } from './state/users.actions';
import { cpfFormatValidator, emailFormatValidator, phoneBrValidator } from '../../shared/validators';

export interface UserFormDialogData {
  user?: User;
}

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormDialogComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  readonly dialogRef = inject(MatDialogRef<UserFormDialogComponent, boolean>);
  readonly data = inject<UserFormDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, emailFormatValidator()]],
    cpf: ['', [Validators.required, cpfFormatValidator()]],
    phone: ['', [Validators.required, phoneBrValidator()]],
    phoneType: this.fb.nonNullable.control<User['phoneType']>('mobile', {
      validators: [Validators.required],
    }),
  });

  constructor() {
    const u = this.data.user;
    if (u) {
      this.form.patchValue({
        name: u.name,
        email: u.email,
        cpf: u.cpf,
        phone: u.phone,
        phoneType: u.phoneType,
      });
    }
  }

  fieldError(field: keyof typeof this.form.controls): string | null {
    const c = this.form.get(field as string);
    if (!c || !c.touched || !c.errors) return null;
    if (c.errors['required']) return 'Campo obrigatório';
    if (c.errors['minlength']) return 'Mínimo de 2 caracteres';
    if (c.errors['emailFormat']) return 'E-mail inválido';
    if (c.errors['cpfFormat']) return 'CPF inválido';
    if (c.errors['phoneFormat']) return 'Telefone inválido (10 ou 11 dígitos)';
    return null;
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    const draft: UserDraft = this.data.user
      ? { id: this.data.user.id, ...v }
      : { ...v };

    merge(
      this.actions$.pipe(ofType(UsersActions.saveSuccess)),
      this.actions$.pipe(ofType(UsersActions.saveFailure)),
    )
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((action) => {
        if (action.type === UsersActions.saveSuccess.type) {
          this.dialogRef.close(true);
        }
      });

    this.store.dispatch(UsersActions.save({ draft }));
  }
}
