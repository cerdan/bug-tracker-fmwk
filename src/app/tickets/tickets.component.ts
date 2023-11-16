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
    localStorage.setItem('tickets', JSON.stringify([]));
    ticketService.save(
      new Ticket(
        1,
        'teste',
        'high',
        'pagina',
        1,
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. In ut debitis perspiciatis quas placeat provident inventore ipsam eaque totam nihil quo vel id odit rem blanditiis, nisi voluptatem laborum qui.\nOmnis earum laudantium qui! Nisi veritatis omnis cumque sequi non mollitia at doloribus modi tenetur quas praesentium eos iste, consectetur, earum culpa qui unde, eaque ipsum enim molestiae dolore maxime!\nMaxime odit aliquam iste deserunt eos cupiditate ex eligendi quia hic omnis officia deleniti voluptatibus dolor, recusandae voluptatum ad reiciendis quibusdam qui accusantium quisquam commodi exercitationem magnam minima. Sint, ab.'
      )
    );
    ticketService.save(
      new Ticket(
        1,
        'teste2',
        'high',
        'pagina',
        1,
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. In ut debitis perspiciatis quas placeat provident inventore ipsam eaque totam nihil quo vel id odit rem blanditiis, nisi voluptatem laborum qui.\nOmnis earum laudantium qui! Nisi veritatis omnis cumque sequi non mollitia at doloribus modi tenetur quas praesentium eos iste, consectetur, earum culpa qui unde, eaque ipsum enim molestiae dolore maxime!\nMaxime odit aliquam iste deserunt eos cupiditate ex eligendi quia hic omnis officia deleniti voluptatibus dolor, recusandae voluptatum ad reiciendis quibusdam qui accusantium quisquam commodi exercitationem magnam minima. Sint, ab.'
      )
    );
    ticketService.save(
      new Ticket(
        1,
        'teste3',
        'high',
        'pagina',
        1,
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. In ut debitis perspiciatis quas placeat provident inventore ipsam eaque totam nihil quo vel id odit rem blanditiis, nisi voluptatem laborum qui.\nOmnis earum laudantium qui! Nisi veritatis omnis cumque sequi non mollitia at doloribus modi tenetur quas praesentium eos iste, consectetur, earum culpa qui unde, eaque ipsum enim molestiae dolore maxime!\nMaxime odit aliquam iste deserunt eos cupiditate ex eligendi quia hic omnis officia deleniti voluptatibus dolor, recusandae voluptatum ad reiciendis quibusdam qui accusantium quisquam commodi exercitationem magnam minima. Sint, ab.'
      )
    );
    this.tickets = ticketService.getTickets();
  }

  ngOnInit(): void {
    this.username = WebStorageUtil.get(AppParam.CUR_USER_KEY);
  }
}
