import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from '../util/WebStorageUtil';
import { AppParam } from '../util/AppParam';

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
    return this.httpClient
      .post<User>(this.URL, JSON.stringify(user), this.httpOptions)
      .toPromise();
    WebStorageUtil.set(AppParam.TBL_USERS, this.users);
  }

  delete(userId: number) {
    this.users = WebStorageUtil.get(AppParam.TBL_USERS);
    this.users = this.users.filter((u) => {
      return u.id?.valueOf() !== userId?.valueOf();
    });
    WebStorageUtil.set(AppParam.TBL_USERS, this.users);
  }

  update(user: User): Promise<User | undefined> {
    return this.httpClient
      .put<User>(
        `${this.URL}/${user.id}`,
        JSON.stringify(user),
        this.httpOptions
      )
      .toPromise();
  }

  getUserByUsername(username: string): Promise<User[] | undefined> {
    return this.httpClient.get<User[]>(`${this.URL}/${username}`).toPromise();
  }

  getUserByCPF(cpf: string): Promise<User[] | undefined> {
    return this.httpClient.get<User[]>(`${this.URL}/${cpf}`).toPromise();
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
      this.getUserByUsername(username).then((u) => {
        resolve(u![0].id);
      }).catch(() => reject(0));
    });
  }

  get(): Promise<User[] | undefined> {
    return this.httpClient.get<User[]>(this.URL).toPromise();
  }

  listUsers() {
    this.get().then((u) => (this.users = u!));

    let list: { username: string; id: number }[] = [];
    this.users.forEach((u) => {
      list.push({ username: u.username, id: u.id });
    });
    return list;
  }
}
