import { LoginService } from './login/login.service';
import { UserService } from './profile/user.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { Subscription } from 'rxjs';
import { WebStorageUtil } from './util/WebStorageUtil';
import { AppParam } from './util/AppParam';
import { Router } from '@angular/router';
import { User } from './models/User';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'Coa.Tracker';
  userLogged: boolean = false;
  userName: string = '';
  subscription?: Subscription;

  constructor(
    private titleService: Title,
    private router: Router,
    private userService: UserService,
    private loginService: LoginService
  ) {
    this.titleService.setTitle(this.title);

    this.userService.exists('admin').then().catch(() => {
      this.userService.save(
        new User(
          'admin',
          'Administrator',
          'admin@admin.com',
          'admin',
          '000.000.000-00'
        )
      );
    });
    this.userService.exists('fillipe').catch(() => {
      this.userService
        .save(
          new User(
            'fillipe',
            'fillipe cerdan',
            'fillipe.cerdan@gmail.com',
            'cerdan',
            '123.321.123-99'
          )
        )
        .then()
        .catch();
    });
    this.getWebStorage();
  }

  ngOnInit(): void {}

  componentActivate(evt: Event) {
    if ((evt instanceof LoginComponent))
    this.subscription = (evt as LoginComponent).loginEvent.subscribe(
      (loginInfo: { username: string; password: string }) =>
        this.onLogin(loginInfo.username, loginInfo.password)
    );
    if((evt instanceof ProfileComponent))
    this.subscription = (evt as ProfileComponent).logoutEvent.subscribe(
      () =>
        this.onLogout()
    );
  }

  componentDeactivate(evt: Event) {
    this.subscription?.unsubscribe();
  }

  onLogin(username: string, password: string): void {
    this.loginService
      .validateCredentials(username, password)
      .then((usrname) => {
        this.userName = usrname;
        this.userLogged = true;
        this.router.navigate(['ticket']);
        this.updateWebStorage();
      })
      .catch(() => {
        alert('O login falhou. Favor validar os dados e tentar novamente.');
      });
  }

  onLogout(): void {
    this.userName = '';
    this.userLogged = false;
    this.router.navigate(['']);
    this.updateWebStorage();
  }

  updateWebStorage() {
    WebStorageUtil.set(AppParam.CUR_USER_KEY, this.userName);
    WebStorageUtil.set(AppParam.LOGGED_KEY, this.userLogged);
  }

  getWebStorage() {
    this.userName = WebStorageUtil.get(AppParam.CUR_USER_KEY);
    this.userLogged = WebStorageUtil.get(AppParam.LOGGED_KEY);
  }
}
