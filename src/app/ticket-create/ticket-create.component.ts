import { Router } from '@angular/router';
import { TicketService } from './../shared/ticket/ticket.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ticket } from '../models/Ticket';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css'],
})
export class TicketCreateComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  ticket! : Ticket;
  
  usernamePattern: any = { U: { pattern: new RegExp('[0-9A-Za-z.]') } };
  namePattern: any = { N: { pattern: new RegExp('[A-Za-z ]') } };

  constructor(private ticketService:TicketService, private router : Router){}

  ngOnInit(){
    this.ticket = new Ticket(0,'','','',0,'');
  }

  onSubmit(){
    this.ticket.owner = 1;
    this.ticketService.save(this.ticket);

    this.form.reset();
    this.ticket = new Ticket(0,'','','',0,'');

    this.router.navigate(['ticket']);
  }
}
