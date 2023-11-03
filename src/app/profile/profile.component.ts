import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  emailPattern: any = {'Ç': { pattern: new RegExp('\[0-9A-Za-z\.\+\]')}};
  usernamePattern: any = {'U': { pattern: new RegExp('\[0-9A-Za-z\.\]')}};
  namePattern: any = {'N': { pattern: new RegExp('\[A-Za-z \]')}};
}
