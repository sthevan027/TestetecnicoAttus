import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserDraft } from '../../models/user.model';
import { MOCK_API_BASE } from '../../mocks/mock-api.constants';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);

  loadAll(): Observable<User[]> {
    return this.http.get<User[]>(`${MOCK_API_BASE}/users`);
  }

  save(draft: UserDraft): Observable<User> {
    const { id, ...rest } = draft;
    if (id) {
      const body: User = { ...(rest as Omit<User, 'id'>), id };
      return this.http.put<User>(`${MOCK_API_BASE}/users/${id}`, body);
    }
    return this.http.post<User>(`${MOCK_API_BASE}/users`, rest);
  }
}
