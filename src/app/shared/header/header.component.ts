import * as M from 'materialize-css';

import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  @Input() userLogged : boolean = false;
  @Input() userName : string = '';
  @Output() logoutEvent = new EventEmitter<void>();
  @ViewChild('mobile') sideNav?: ElementRef;

  ngAfterViewInit(): void {
    M.Sidenav.init(this.sideNav?.nativeElement, { edge: 'right' });
  }

  onClickLogout(){
    this.logoutEvent.emit();
  }
}
