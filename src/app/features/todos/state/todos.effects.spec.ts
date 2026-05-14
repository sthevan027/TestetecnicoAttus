import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TodosEffects } from './todos.effects';
import { TodosActions } from './todos.actions';
import { TodosService } from '../todos.service';
import { MOCK_API_BASE } from '../../../mocks/mock-api.constants';

describe('TodosEffects', () => {
  let actions$: Observable<Action>;
  let httpMock: HttpTestingController;
  let effects: TodosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosEffects, TodosService, provideMockActions(() => actions$)],
    });
    effects = TestBed.inject(TodosEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('loadTodos dispara sucesso', (done) => {
    actions$ = of(TodosActions.loadTodos());
    effects.loadTodos$.subscribe((action) => {
      expect(action).toEqual(
        TodosActions.loadTodosSuccess({
          todos: [{ id: '1', title: 'T', completed: false }],
        }),
      );
      done();
    });
    const req = httpMock.expectOne(`${MOCK_API_BASE}/todos`);
    req.flush([{ id: '1', title: 'T', completed: false }]);
  });

  it('loadTodos dispara falha', (done) => {
    actions$ = of(TodosActions.loadTodos());
    effects.loadTodos$.subscribe((action) => {
      expect(action.type).toBe(TodosActions.loadTodosFailure.type);
      done();
    });
    const req = httpMock.expectOne(`${MOCK_API_BASE}/todos`);
    req.error(new ProgressEvent('error'));
  });
});
