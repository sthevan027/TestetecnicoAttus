import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, switchMap } from 'rxjs/operators';
import { Observable, of, throwError, timer } from 'rxjs';
import { User } from '../models/user.model';
import { Todo } from '../models/todo.model';
import { MOCK_API_BASE } from './mock-api.constants';

let mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Souza',
    email: 'ana.souza@example.com',
    cpf: '52998224725',
    phone: '11999990001',
    phoneType: 'mobile',
  },
  {
    id: '2',
    name: 'Bruno Lima',
    email: 'bruno.lima@example.com',
    cpf: '11144477735',
    phone: '2133334444',
    phoneType: 'landline',
  },
  {
    id: '3',
    name: 'Carla Mendes',
    email: 'carla.m@example.com',
    cpf: '71428793860',
    phone: '85988887777',
    phoneType: 'mobile',
  },
];

let mockTodos: Todo[] = [
  { id: 't1', title: 'Estudar Angular', completed: false },
  { id: 't2', title: 'Revisar RxJS', completed: true },
  { id: 't3', title: 'Escrever testes', completed: false },
];

function jsonBody<T>(data: T): Observable<HttpResponse<T>> {
  return of(new HttpResponse({ body: data, status: 200 })).pipe(delay(250));
}

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(MOCK_API_BASE)) {
    return next(req);
  }

  const usersPath = `${MOCK_API_BASE}/users`;
  const todosPath = `${MOCK_API_BASE}/todos`;

  if (req.method === 'GET' && req.url === usersPath) {
    return jsonBody([...mockUsers]);
  }

  if (req.method === 'GET' && req.url === todosPath) {
    return jsonBody([...mockTodos]);
  }

  if (req.method === 'POST' && req.url === usersPath) {
    const body = req.body as Omit<User, 'id'>;
    const user: User = { ...body, id: crypto.randomUUID() };
    mockUsers = [...mockUsers, user];
    return jsonBody(user);
  }

  if (req.method === 'PUT' && req.url.startsWith(`${usersPath}/`)) {
    const id = req.url.slice(usersPath.length + 1);
    const body = req.body as User;
    const idx = mockUsers.findIndex((u) => u.id === id);
    if (idx === -1) {
      return timer(50).pipe(switchMap(() => throwError(() => new Error('Usuário não encontrado'))));
    }
    const updated: User = { ...body, id };
    mockUsers = mockUsers.map((u) => (u.id === id ? updated : u));
    return jsonBody(updated);
  }

  if (req.method === 'GET' && req.url.startsWith(`${MOCK_API_BASE}/search`)) {
    const q = new URL(req.url).searchParams.get('q') ?? '';
    const term = q.trim().toLowerCase();
    const results = mockUsers.filter((u) => u.name.toLowerCase().includes(term));
    return jsonBody(results);
  }

  return timer(50).pipe(
    switchMap(() => throwError(() => new Error(`Mock não implementado: ${req.method} ${req.url}`))),
  );
};

export function resetMockDataForTests(): void {
  mockUsers = [
    {
      id: '1',
      name: 'Ana Souza',
      email: 'ana.souza@example.com',
      cpf: '52998224725',
      phone: '11999990001',
      phoneType: 'mobile',
    },
  ];
  mockTodos = [{ id: 't1', title: 'Teste', completed: false }];
}
