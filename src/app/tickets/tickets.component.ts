import { WebStorageUtil } from './../util/WebStorageUtil';
import { AppParam } from './../util/AppParam';
import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Ticket } from '../models/Ticket';
import { User } from '../models/User';
import { UserService } from '../profile/user.service';
import { TicketObservableService } from '../shared/ticket/ticket-observable.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit, OnDestroy {
  username: string = '';
  public user?: User;
  public tickets?: Ticket[];
  private ticketSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketObservableService,
    private userService: UserService
  ) {
    this.username = WebStorageUtil.get(AppParam.CUR_USER_KEY);
    this.userService.getUserId(this.username).then((userId) => {
      this.ticketSubscription = ticketService
        .getAssignedTo(userId)
        .subscribe((tickets) => {
          this.tickets = tickets;
        });
    });
  }
  ngOnDestroy(): void {
    if (this.ticketSubscription) this.ticketSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.username = WebStorageUtil.get(AppParam.CUR_USER_KEY);
  }
}
