import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { MOCK_API_BASE } from '../../mocks/mock-api.constants';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private readonly http = inject(HttpClient);

  loadAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${MOCK_API_BASE}/todos`);
  }
}
