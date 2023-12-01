import { UserService } from './../profile/user.service';
import { Subscription } from 'rxjs';
import { TicketService } from './../shared/ticket/ticket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ticket } from '../models/Ticket';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
})
export class TicketDetailComponent implements OnInit {
  ticket!: Ticket;
  paramSubscription!: Subscription;
  ownerName!: string;
  assignedTo!: string;

  constructor(
    private ticketService: TicketService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.ticket = this.ticketService.getTicket(
        parseInt(this.route.snapshot.paramMap.get('id')!)
      );

      // Get username from creator Id
      this.userService
        .getUsername(this.ticket.userId)
        .then((u) => {
          this.ownerName = u;
        })
        .catch(() => {
          this.router.navigate(['/ticket']);
        });

        // Get username from assigned Id
      this.userService
        .getUsername(this.ticket.assignedTo)
        .then((u) => {
          this.assignedTo = u;
        })
        .catch(() => {
          this.assignedTo = '';
        });
    } else {
      this.router.navigate(['/ticket']);
    }
  }

  ngOnDestroy(): void {}
}
