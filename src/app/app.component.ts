import { UserService } from './profile/user.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { Subscription } from 'rxjs';
import { WebStorageUtil } from './util/WebStorageUtil';
import { AppParam } from './util/AppParam';
import { Router } from '@angular/router';
import { User } from './models/User';

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
    private userService: UserService
  ) {
    this.titleService.setTitle(this.title);

    if (!this.userService.exists('admin'))
    this.userService.save(
      new User(
        'admin',
        'Administrator',
        'admin@admin.com',
        'admin',
        '000.000.000-00'
      )
    );
    if (!this.userService.exists('fillipe'))
      this.userService.save(
        new User(
          'fillipe',
          'fillipe cerdan',
          'fillipe.cerdan@gmail.com',
          'cerdan',
          '123.321.123-99'
        )
      );

    this.getWebStorage();
  }

  ngOnInit(): void {}

  componentActivate(evt: Event) {
    if (!(evt instanceof LoginComponent)) return;
    this.subscription = (evt as LoginComponent).loginEvent.subscribe(
      (loginInfo: { username: string; password: string }) =>
        this.onLogin(loginInfo.username, loginInfo.password)
    );
  }

  componentDeactivate(evt: Event) {
    this.subscription?.unsubscribe();
  }

  onLogin(username: string, password: string): void {
    this.userName = this.userService.validateCredentials(username, password);
    if (this.userName.length === 0) {
      alert('O login falhou. Favor validar os dados e tentar novamente.');
      return;
    }
    this.userLogged = true;
    this.router.navigate(['ticket']);
    this.updateWebStorage();
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

