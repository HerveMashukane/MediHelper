import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnectionStatusService } from '../../services/connection-status/connection-status.service';
import { AuthService } from '../../core/services/auth.service';
import { ROLE_LABELS } from '../../core/constants/roles';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isOnline$: Observable<boolean>;
  isDropdownOpen = false;

  readonly displayName = computed(() => this.auth.user()?.displayName ?? 'User');
  readonly displayEmail = computed(() => this.auth.user()?.displayEmail ?? 'User');
  readonly roleLabel = computed(() => {
    const role = this.auth.role();
    return role ? ROLE_LABELS[role] : 'Guest';
  });
  readonly dashboardLink = computed(() => this.auth.getDashboardPath());

  constructor(
    private connectionStatusService: ConnectionStatusService,
    public auth: AuthService
  ) {
    this.isOnline$ = this.connectionStatusService.isOnline$;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.isDropdownOpen = false;
    this.auth.logout();
  }
}
