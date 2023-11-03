import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit{
  username : string = '';

  constructor(private route : ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['username']) {
        this.username = params['username'];
      }
    });
  }

  
}
