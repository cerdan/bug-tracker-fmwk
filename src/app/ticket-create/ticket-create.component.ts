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
  ElementRef,
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Ticket } from '../models/Ticket';
import { AppParam } from '../util/AppParam';
import * as M from 'materialize-css';
import { Observable, Subject, Subscription } from 'rxjs';
import { StrippedUser } from '../models/StrippedUser';
import { TicketObservableService } from '../shared/ticket/ticket-observable.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css'],
})
export class TicketCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('form') form!: NgForm;
  @ViewChild('descElem') description!: ElementRef;

  ticket!: Ticket;
  ticket$!: Observable<Ticket>;
  edit: boolean = false;
  users!: Promise<StrippedUser[]>;
  paramSubscription!: Subscription;
  ticketSubscription!: Subscription;

  usernamePattern: any = { U: { pattern: new RegExp('[0-9A-Za-z.]') } };
  namePattern: any = { N: { pattern: new RegExp('[A-Za-z ]') } };

  constructor(
    private ticketService: TicketObservableService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.users = userService.listUsers();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      M.FormSelect.init(document.querySelectorAll('select'));
    }, 10);
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) this.paramSubscription.unsubscribe();
    if (this.ticketSubscription) this.ticketSubscription.unsubscribe();
  }

  ngOnInit() {
    this.paramSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['tId']) {
          this.edit = true;
          this.ticket$ = this.ticketService.getTicket(params['tId']);

          this.ticket$.subscribe((ticket) => {
            this.ticket = Ticket.clone(ticket);
            setTimeout(() => {
              M.FormSelect.init(document.querySelectorAll('select'));
              M.updateTextFields();
              M.textareaAutoResize(this.description.nativeElement);
            }, 100);
          });
        } else {
          this.ticket$ = new Observable<Ticket>((subscriber) =>
            subscriber.next(new Ticket(0, '', '', '', 0, ''))
          );
          this.ticketSubscription = this.ticket$.subscribe((ticket) => {
            this.ticket = Ticket.clone(ticket);
            setTimeout(() => {
              M.FormSelect.init(document.querySelectorAll('select'));
              M.updateTextFields();
              M.textareaAutoResize(this.description.nativeElement);
            }, 100);
          });
        }
      }
    );
  }

  onSubmit() {
    this.userService
      .getUserId(WebStorageUtil.get(AppParam.CUR_USER_KEY))
      .then((userId) => {
        if (!this.edit) this.ticket.userId = userId;
      })
      .catch(() => (this.ticket.userId = 0))
      .finally(() => {
        console.log(this.ticket.userId + ' ' + this.edit);
        console.log(this.ticket);
        if (this.edit)
          this.ticketService.update(this.ticket).subscribe();
        else this.ticketService.save(this.ticket).subscribe();
        this.form.reset();
        this.ticket = new Ticket(0, '', '', '', 0, '');
        this.router.navigate(['ticket']);
      });
    if (this.paramSubscription) this.paramSubscription.unsubscribe();

  }
}
