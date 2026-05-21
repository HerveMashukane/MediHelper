import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  
  constructor(private router: Router) {}
  // login variables
  adminEmail = "herve@gmail.com";
  adminPassword = "1234";
  errorMessage = "";

  adminLogin() {
    const email = this.adminEmail.trim();
    const password = this.adminPassword.trim();
    if (email && password) {
      this.router.navigate(["adminDashboard"]);
    } else {
      this.errorMessage = "Invalid credentials";
    }
  }
}
