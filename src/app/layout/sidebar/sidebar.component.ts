import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { getNavSections } from '../../shared/config/navigation.config';
import { ROLES } from '../../core/constants/roles';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly navSections = computed(() => {
    const role = this.auth.role() ?? ROLES.ADMIN;
    return getNavSections(role);
  });

  readonly roleLabel = computed(() => this.auth.user()?.role ?? 'guest');

  constructor(public auth: AuthService) {}
}
