import { NgxMaskDirective } from 'ngx-mask/lib/ngx-mask.directive';
import {
  Component,
  EventEmitter,
  Output,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
  Input,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @Output() loginEvent = new EventEmitter<{username : string, password : string}>();
  @Input() message : string = '';
  @ViewChild('usernameField') userField?: ElementRef;
  @ViewChild('passwordField') pwdField?: ElementRef;
  username: string = '';
  password: string = '';
  userInput!: HTMLInputElement;
  pwdInput!: HTMLInputElement;

  emailPattern: any = { Ç: { pattern: new RegExp('[0-9A-Za-z.+]') } };
  usernamePattern: any = { U: { pattern: new RegExp('[0-9A-Za-z.]')}, A: { pattern: new RegExp('[A-Za-z]') }, 0: { pattern: new RegExp('[0-9]') } };
  namePattern: any = { N: { pattern: new RegExp('[A-Za-z ]') } };

  constructor(private route: ActivatedRoute) {}
  ngAfterViewInit(): void {
    this.userInput = this.userField?.nativeElement as HTMLInputElement;
    this.pwdInput = this.pwdField?.nativeElement as HTMLInputElement;

    this.userInput.focus();
    if (!this.username) return;

    // https://github.com/JsDaddy/ngx-mask/issues/723 workaroud with setTimeout
    setTimeout(() => {
      this.userInput.value = this.username;
      this.pwdInput.focus();
    }, 1);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['username']) {
        this.username = params['username'];
      }
    });
  }

  onClickLogin(): void {
    this.username = this.userField?.nativeElement.value;
    this.password = this.pwdField?.nativeElement.value;
    this.loginEvent.emit({username: this.username, password: this.password});
  }
}
