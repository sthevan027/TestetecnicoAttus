import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { MOCK_API_BASE } from '../../mocks/mock-api.constants';

@Injectable({ providedIn: 'root' })
export class ReactiveSearchService {
  private readonly http = inject(HttpClient);

  search(term: string): Observable<User[]> {
    const q = term.trim();
    if (!q) {
      return of([]);
    }
    const url = `${MOCK_API_BASE}/search?q=${encodeURIComponent(q)}`;
    return this.http.get<User[]>(url).pipe(catchError(() => of([])));
  }
}
