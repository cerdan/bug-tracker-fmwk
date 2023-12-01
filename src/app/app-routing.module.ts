import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketCreateComponent as CreateTicketComponent } from './ticket-create/ticket-create.component'
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

const routes: Routes = [
  {path: 'index', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'ticket', component: TicketsComponent},
  {path: 'create', component: CreateTicketComponent},
  {path: 'show/:id', component: TicketDetailComponent},
  {path: '', redirectTo: 'index', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
