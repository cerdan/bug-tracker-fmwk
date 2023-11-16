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
    this.Tickets = WebStorageUtil.get("tickets");
  }

  save(Ticket: Ticket) {
    this.Tickets = WebStorageUtil.get("tickets");
    this.Tickets.push(Ticket);
    WebStorageUtil.set("tickets", this.Tickets);
  }

  delete(ticketId: number) {
    this.Tickets = WebStorageUtil.get("tickets");
    this.Tickets = this.Tickets.filter(t => {
      return t.id?.valueOf() != ticketId?.valueOf();
    });
    WebStorageUtil.set("tickets", this.Tickets);
  }

  update(Ticket: Ticket) {
    this.delete(Ticket.id);
    this.save(Ticket);
  }

  getAssignedTo(user : User){
    this.Tickets = WebStorageUtil.get("tickets");
    return this.Tickets.filter(t => {
       return t.attributedTo?.valueOf() == user?.id?.valueOf();
    })
  }
}
