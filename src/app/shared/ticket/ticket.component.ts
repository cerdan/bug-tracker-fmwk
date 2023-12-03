import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/Ticket';
import { Component, Input, OnInit } from '@angular/core';
import { TicketObservableService } from './ticket-observable.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  @Input() ticket?: Ticket;

  constructor(
    private ticketService: TicketObservableService,
    private router: Router,
  ) {}
  ngOnInit(): void {}

  onDelete($event : Event) {
    let verify = window.confirm(
      'Não há como recuperar os dados após a exclusão, deseja continuar?'
    );
    if (!verify) {
      $event.stopPropagation();
      return;
    }
    this.ticketService.delete(this.ticket!.id).subscribe(()=>location.reload());
    $event.stopPropagation();
  }
  
  onUpdate($event : Event) {
    this.router.navigate(['/create'], {
      queryParams: { tId: this.ticket!.id },
    });
    $event.stopPropagation();
  }
}
