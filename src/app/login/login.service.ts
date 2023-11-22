import { User } from './../models/User';
import { UserService } from './../profile/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private userService: UserService) {}

  validateCredentials(username: string, password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let user: User;
      if (username.charAt(0) >= '0' && username.charAt(0) <= '9')
        this.userService.getUserByCPF(username).then((u) => {
          if (u === undefined) {
            reject();
            return;
          }

          user = u![0];
          if (user!.password.valueOf() === password.valueOf())
            resolve(user!.username);
          else reject();
        });
      else
        this.userService.getUserByUsername(username).then((u) => {
          if (u === undefined || u.length === 0) {
            reject();
            return;
          }

          user = u![0];
          if (user!.password.valueOf() === password.valueOf())
            resolve(user!.username);
          else reject();
        });
    });
  }

}
