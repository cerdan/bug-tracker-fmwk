import * as M from 'materialize-css';

import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit{
  @ViewChild('mobile') sideNav?: ElementRef;
  
  userLogged : boolean = false;

  ngAfterViewInit(): void {
    M.Sidenav.init(this.sideNav?.nativeElement, {edge:'right'});
  }

  onClickLogin(e : Event) : void{
    this.userLogged = true;
    console.log("Login");
  }

  onClickLogout(e : Event) : void{
    this.userLogged = false;
  }
}
