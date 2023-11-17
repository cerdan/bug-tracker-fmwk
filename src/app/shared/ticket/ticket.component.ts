import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from './ticket.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  @Input() ticket?: Ticket;

  constructor(private ticketService: TicketService, private router: Router) {
  }
  ngOnInit(): void {
  }

  onDelete() {
    let verify = window.confirm(
      'Não há como recuperar os dados após a exclusão, deseja continuar?'
    );
    if (!verify) {
      return;
    }
    this.ticketService.delete(this.ticket!.id);
    location.reload();
  }

  onUpdate() {
    this.router.navigate(['/create'], {
      queryParams: { tId: this.ticket!.id },
    });
  }
}
