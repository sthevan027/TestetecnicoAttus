import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { UsersEffects } from './users.effects';
import { UsersActions } from './users.actions';
import { UsersService } from '../users.service';
import { MOCK_API_BASE } from '../../../mocks/mock-api.constants';

describe('UsersEffects', () => {
  let actions$: Observable<Action>;
  let httpMock: HttpTestingController;
  let effects: UsersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersEffects, UsersService, provideMockActions(() => actions$)],
    });
    effects = TestBed.inject(UsersEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('load dispara sucesso com lista', (done) => {
    actions$ = of(UsersActions.load());
    effects.loadUsers$.subscribe((action) => {
      expect(action).toEqual(
        UsersActions.loadSuccess({
          users: [
            {
              id: '1',
              name: 'X',
              email: 'x@x.com',
              cpf: '1',
              phone: '1',
              phoneType: 'mobile',
            },
          ],
        }),
      );
      done();
    });

    const req = httpMock.expectOne(`${MOCK_API_BASE}/users`);
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: '1',
        name: 'X',
        email: 'x@x.com',
        cpf: '1',
        phone: '1',
        phoneType: 'mobile',
      },
    ]);
  });

  it('load dispara falha em erro HTTP', (done) => {
    actions$ = of(UsersActions.load());
    effects.loadUsers$.subscribe((action) => {
      expect(action.type).toBe(UsersActions.loadFailure.type);
      done();
    });
    const req = httpMock.expectOne(`${MOCK_API_BASE}/users`);
    req.error(new ProgressEvent('error'));
  });

  it('save dispara sucesso', (done) => {
    actions$ = of(
      UsersActions.save({
        draft: {
          name: 'N',
          email: 'n@n.com',
          cpf: '12345678901',
          phone: '11999999999',
          phoneType: 'mobile',
        },
      }),
    );
    effects.saveUser$.subscribe((action) => {
      expect(action.type).toBe(UsersActions.saveSuccess.type);
      done();
    });
    const req = httpMock.expectOne(`${MOCK_API_BASE}/users`);
    expect(req.request.method).toBe('POST');
    req.flush({
      id: '99',
      name: 'N',
      email: 'n@n.com',
      cpf: '12345678901',
      phone: '11999999999',
      phoneType: 'mobile',
    });
  });

  it('save dispara falha em erro HTTP', (done) => {
    actions$ = of(
      UsersActions.save({
        draft: {
          name: 'N',
          email: 'n@n.com',
          cpf: '12345678901',
          phone: '11999999999',
          phoneType: 'mobile',
        },
      }),
    );
    effects.saveUser$.subscribe((action) => {
      expect(action.type).toBe(UsersActions.saveFailure.type);
      done();
    });
    const req = httpMock.expectOne(`${MOCK_API_BASE}/users`);
    req.error(new ProgressEvent('error'));
  });
});
