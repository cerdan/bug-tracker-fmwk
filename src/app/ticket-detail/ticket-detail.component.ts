import { UserService } from './../profile/user.service';
import { Observable, Subscription } from 'rxjs';
import { TicketService } from './../shared/ticket/ticket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ticket } from '../models/Ticket';
import { TicketObservableService } from '../shared/ticket/ticket-observable.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
})
export class TicketDetailComponent implements OnInit {
  ticket!: Ticket;
  ticket$!: Observable<Ticket>;
  paramSubscription!: Subscription;
  ownerName!: Promise<string>;
  assignedTo!: Promise<string>;

  constructor(
    private ticketService: TicketObservableService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.ticket$ = this.ticketService.getTicket(
        parseInt(this.route.snapshot.paramMap.get('id')!)
      );

      this.ticket$.subscribe((ticket) => {
        // Get username from creator Id
        this.ownerName = this.userService.getUsername(ticket.userId);
  
        this.ownerName
          .then((u) => {})
          .catch(() => {
            this.router.navigate(['/ticket']);
          });
  
        // Get username from assigned Id
        this.assignedTo = this.userService.getUsername(ticket.assignedTo);
      });

    } else {
      this.router.navigate(['/ticket']);
    }
  }

  ngOnDestroy(): void {}
}
