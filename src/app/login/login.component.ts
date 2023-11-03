import { Component, EventEmitter, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @Output() loginEvent = new EventEmitter<string>();
  @ViewChild('usernameField') userField? : ElementRef;
  username : string = '';
  password : string = '';

  constructor(){

  }

  ngAfterViewInit() : void{

  }

  onClickLogin() : void{
    this.username = this.userField?.nativeElement.value;
    this.loginEvent.emit(this.username);  
  }
}
