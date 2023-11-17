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

  constructor() {
    this.users = WebStorageUtil.get(AppParam.TBL_USERS);
  }

  save(user: User) {
    this.users = WebStorageUtil.get(AppParam.TBL_USERS);
    this.users.push(user);
    WebStorageUtil.set(AppParam.TBL_USERS, this.users);
  }

  delete(userId: number) {
    this.users = WebStorageUtil.get(AppParam.TBL_USERS);
    this.users = this.users.filter((u) => {
      return u.id?.valueOf() !== userId?.valueOf();
    });
    WebStorageUtil.set(AppParam.TBL_USERS, this.users);
  }

  update(user: User) {
    this.delete(user.id);
    this.save(user);
  }

  private getUserByUsername(username: string) {
    this.users = WebStorageUtil.get(AppParam.TBL_USERS);
    return this.users.find((u) => {
      return u.username?.valueOf() === username?.valueOf();
    });
  }

  private getUserByCPF(cpf: string) {
    this.users = WebStorageUtil.get(AppParam.TBL_USERS);
    return this.users.find((u) => {
      return u.cpf?.valueOf() === cpf?.valueOf();
    });
  }

  exists(username: string) {
    return this.getUserByUsername(username) !== undefined;
  }

  validateCredentials(username: string, password: string): string {
    if (username.charAt(0) >= '0' && username.charAt(0) <= '9')
      this.user = this.getUserByCPF(username);
    else this.user = this.getUserByUsername(username);

    if (this.user?.password.valueOf() === password.valueOf())
      return this.user?.username;

    return '';
  }

  getUserId(username : string){
    return this.getUserByUsername(username)?.id;
  }

  listUsers(){
    this.users = WebStorageUtil.get(AppParam.TBL_USERS);
    let list : {username:string, id:number}[]= [];
    this.users.forEach(u => {
      list.push({username:u.username, id: u.id});
    });
    return list;
  }
}
