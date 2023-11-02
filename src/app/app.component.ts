import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title : string = 'Coa.Tracker';
  userLogged : boolean = false;
  userName : string = '';

  constructor(private titleService : Title){
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {}

  
  onLogin(e : Event, usuario : string) : void{
    this.userLogged = true;
    this.userName = usuario;
  }

  onLogout() : void{
    this.userLogged = false;
    this.userName = '';
  }
}
