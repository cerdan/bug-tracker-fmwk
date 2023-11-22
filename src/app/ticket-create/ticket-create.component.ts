import { UserService } from './../profile/user.service';
import { WebStorageUtil } from './../util/WebStorageUtil';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TicketService } from './../shared/ticket/ticket.service';
import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Ticket } from '../models/Ticket';
import { AppParam } from '../util/AppParam';
import * as M from 'materialize-css';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css'],
})
export class TicketCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('form') form!: NgForm;
  
  ticket!: Ticket;
  edit: boolean = false;
  users!: { username: string; id: number }[];
  paramSubstcription!: Subscription;

  usernamePattern: any = { U: { pattern: new RegExp('[0-9A-Za-z.]') } };
  namePattern: any = { N: { pattern: new RegExp('[A-Za-z ]') } };
  
  constructor(
    private ticketService: TicketService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.users = userService.listUsers();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      var instances = M.FormSelect.init(document.querySelectorAll('select'));
    }, 10);
  }

  ngOnDestroy(): void {
    this.paramSubstcription.unsubscribe();
  }

  ngOnInit() {
    this.paramSubstcription = this.route.queryParams.subscribe((params: Params) => {
      if (params['tId']) {
        this.edit = true;
        this.ticket = Ticket.clone(this.ticketService.getTicket(params['tId']));
      } else {
        this.ticket = new Ticket(0, '', '', '', 0, '');
      }
    });
  }

  onSubmit() {
    this.ticket.userId =
      this.userService.getUserId(WebStorageUtil.get(AppParam.CUR_USER_KEY)) ??
      0;

    if (this.edit) this.ticketService.update(this.ticket);
    else this.ticketService.save(this.ticket);

    this.form.reset();
    this.ticket = new Ticket(0, '', '', '', 0, '');

    this.router.navigate(['ticket']);
  }
}
