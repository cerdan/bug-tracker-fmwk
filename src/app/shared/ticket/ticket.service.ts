import { User } from './../../models/User';
import { Ticket } from '../../models/Ticket';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from '../../util/WebStorageUtil';
import { AppParam } from '../../util/AppParam';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  Ticket?: Ticket;
  Tickets!: Ticket[];

  constructor() {
    this.Tickets = WebStorageUtil.get(AppParam.TBL_TICKETS);
  }

  save(Ticket: Ticket) {
    this.Tickets = WebStorageUtil.get(AppParam.TBL_TICKETS);
    this.Tickets.push(Ticket);
    WebStorageUtil.set(AppParam.TBL_TICKETS, this.Tickets);
  }

  delete(ticketId: number) {
    this.Tickets = WebStorageUtil.get(AppParam.TBL_TICKETS);
    this.Tickets = this.Tickets.filter((t) => {
      return t.id?.valueOf() != ticketId?.valueOf();
    });
    WebStorageUtil.set(AppParam.TBL_TICKETS, this.Tickets);
  }

  update(Ticket: Ticket) {
    this.delete(Ticket.id);
    this.save(Ticket);
  }

  getAssignedTo(userId: number) {
    this.Tickets = WebStorageUtil.get(AppParam.TBL_TICKETS);
    return this.Tickets.filter((t) => {
      return t.attributedTo?.valueOf() == userId?.valueOf();
    });
  }
  
  getTickets(): Ticket[] {
    this.Tickets = WebStorageUtil.get(AppParam.TBL_TICKETS);
    return this.Tickets
  }

  getTicket(ticketId : number): Ticket {
    return this.Tickets.find((t) => {
      return t.id?.valueOf() == ticketId?.valueOf();
    }) ?? new Ticket(0,'','','',0,'');
  }
}
