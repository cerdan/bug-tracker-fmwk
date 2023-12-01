import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/models/Ticket';
import { AppParam } from 'src/app/util/AppParam';

@Injectable({
  providedIn: 'root'
})
export class TicketObservableService {
  Ticket?: Ticket;
  Tickets!: Ticket[];

  URL = 'http://localhost:3000/tickets';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  
  constructor(private httpClient: HttpClient) {

  }

  save(ticket: Ticket) : Observable<Ticket>{
    return this.httpClient.post<Ticket>(
      this.URL,
      JSON.stringify(ticket),
      this.httpOptions
    );
  }

  delete(ticketId: number) : Observable<Ticket> {
    return this.httpClient.delete<Ticket>(
      `${this.URL}/${ticketId}`,
      this.httpOptions
    );
  }

  update(ticket: Ticket) : Observable<Ticket> {
    return this.httpClient.put<Ticket>(
      `${this.URL}/${ticket.id}`,
      JSON.stringify(ticket),
      this.httpOptions
    );
  }

  getAssignedTo(userId: number) : Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`${this.URL}/assignedTo/${userId}`)
  }
  
  getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`${this.URL}`)
  }

  getTicket(ticketId : number): Observable<Ticket> {
    return this.httpClient.get<Ticket>(`${this.URL}/${ticketId}`)
  }
}
