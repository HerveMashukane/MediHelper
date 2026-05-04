import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnectionStatusService } from '../../services/connection-status/connection-status.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // check system connection status
  isOnline$: Observable<boolean>;
  constructor(private connectionStatusService: ConnectionStatusService) {
    this.isOnline$ = this.connectionStatusService.isOnline$;
  }
  // drop down toggle
  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
