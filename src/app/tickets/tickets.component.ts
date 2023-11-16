import { WebStorageUtil } from './../util/WebStorageUtil';
import { AppParam } from './../util/AppParam';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Ticket } from '../models/Ticket';
import { User } from '../models/User';
import { TicketService } from '../shared/ticket/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  username: string = '';
  public user?: User;
  public tickets?: Ticket[];

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {
    this.tickets = ticketService.getTickets();
  }

  ngOnInit(): void {
    this.username = WebStorageUtil.get(AppParam.CUR_USER_KEY);
  }
}
