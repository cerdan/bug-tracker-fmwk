import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from '../util/WebStorageUtil';
import { AppParam } from '../util/AppParam';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user?: User;
  users!: User[];

  URL = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {
    this.users = WebStorageUtil.get(AppParam.TBL_USERS);
  }

  save(user: User) {
    const user$ = this.httpClient.post<User>(
      this.URL,
      JSON.stringify(user),
      this.httpOptions
    );

    return firstValueFrom(user$);
  }

  delete(userId: number) {
    const user$ = this.httpClient.delete<User>(
      `${this.URL}/id/${userId}`,
      this.httpOptions
    );
    return firstValueFrom(user$);
  }

  update(user: User): Promise<User | undefined> {
    const user$ = this.httpClient.put<User>(
      `${this.URL}/id/${user.id}`,
      JSON.stringify(user),
      this.httpOptions
    );
    return firstValueFrom(user$);
  }

  getUserByUsername(username: string): Promise<User[]> {
    const users$ = this.httpClient.get<User[]>(`${this.URL}/${username}`);
    return firstValueFrom(users$);
  }

  getUserByCPF(cpf: string): Promise<User[] | undefined> {
    const users$ = this.httpClient.get<User[]>(`${this.URL}/cpf/${cpf}`);
    return firstValueFrom(users$);
  }

  exists(username: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getUserByUsername(username)
        .then(() => {
          resolve();
        })
        .catch(() => reject('k'));
    });
  }

  getUserId(username: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.getUserByUsername(username)
        .then((u) => {
          resolve(u![0].id);
        })
        .catch(() => reject(0));
    });
  }

  get(): Promise<User[]> {
    const users$ = this.httpClient.get<User[]>(this.URL);
    return firstValueFrom(users$);
  }

  listUsers() {
    this.get().then((u) => (this.users = u));

    let list: { username: string; id: number }[] = [];
    this.users.forEach((u) => {
      list.push({ username: u.username, id: u.id });
    });
    return list;
  }
}
