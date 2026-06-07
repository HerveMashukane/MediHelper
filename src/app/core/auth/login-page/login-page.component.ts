import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ROLE_LABELS, ROLES, UserRole } from '../../constants/roles';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  userName = 'Herve Mashukane';
  email = 'herve@gmail.com';
  password = '1234';
  selectedRole: UserRole = ROLES.ADMIN;
  errorMessage = '';

  readonly roles = Object.values(ROLES);
  readonly roleLabels = ROLE_LABELS;

  constructor(private auth: AuthService) {}

  login(): void {
    const ok = this.auth.login(this.userName, this.email, this.password, this.selectedRole);
    if (!ok) {
      this.errorMessage = 'Enter email and password to continue.';
    } else {
      this.errorMessage = '';
    }
  }
}
