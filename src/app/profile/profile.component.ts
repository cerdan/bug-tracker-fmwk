import { UserService } from './user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { User } from '../models/User';
import { WebStorageUtil } from '../util/WebStorageUtil';
import { AppParam } from '../util/AppParam';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import * as M from 'materialize-css';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Output() logoutEvent = new EventEmitter();
  @ViewChild('form') form!: NgForm;

  emailPattern: any = { Ç: { pattern: new RegExp('[0-9A-Za-z.+]') } };
  usernamePattern: any = { U: { pattern: new RegExp('[0-9A-Za-z.]') } };
  namePattern: any = { N: { pattern: new RegExp('[A-Za-z ]') } };

  edit: boolean = false;
  user!: User;
  paramSubscription!: Subscription;
  passwordConfirmation: string = '';
  emailConfirmation: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.userService;
    this.user = new User('', '', '', '', '');
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  ngOnInit() {
    this.paramSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['uName']) {
          this.edit = true;
          this.userService
            .getUserByUsername(WebStorageUtil.get(AppParam.CUR_USER_KEY))
            .then((user: User[]) => {
              this.user = User.clone(user[0]);
              setTimeout(() => {
                M.updateTextFields();
              }, 1);
            })
            .catch(() => alert('Usuário não encontrado'));
        } else {
          this.edit = false;
          this.user = new User('', '', '', '', '');
        }
      }
    );
  }

  onSubmit() {
    if (this.edit) this.userService.update(this.user);
    else this.userService.save(this.user);

    this.form.reset();
    this.user = new User('', '', '', '', '');

    this.router.navigate([this.edit ? 'ticket' : 'login']);
  }

  onDelete() {
    if (confirm('Deseja realmente excluir o usuário?\nNão há como desfazer.')) {
      this.userService
        .getUserId(WebStorageUtil.get(AppParam.CUR_USER_KEY))
        .then((userId) => this.userService.delete(userId))
        .catch(() => alert('Usuário não encontrado'));
      this.logoutEvent.emit();
    }
  }
}
