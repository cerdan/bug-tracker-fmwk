import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { Subscription } from 'rxjs';
import { WebStorageUtil } from './util/WebStorageUtil';
import { AppParam } from './util/AppParam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title : string = 'Coa.Tracker';
  userLogged : boolean = false;
  userName : string = '';
  subscription? : Subscription;

  constructor(private titleService : Title){
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {}

  componentActivate(evt : Event){
    if (!(evt instanceof LoginComponent)) return;
    this.subscription = (evt as LoginComponent).loginEvent.subscribe((username : string) => this.onLogin(username));
  }

  componentDeactivate(evt : Event){
    this.subscription?.unsubscribe();
  }

  onLogin(usuario : string) : void{
    WebStorageUtil.set(AppParam.CUR_USER_KEY, usuario);
    WebStorageUtil.set(AppParam.LOGGED_KEY, true);
  }

  onLogout() : void{
    WebStorageUtil.set(AppParam.CUR_USER_KEY, '');
    WebStorageUtil.set(AppParam.LOGGED_KEY, true);
  }
}
