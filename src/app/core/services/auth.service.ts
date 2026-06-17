import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES, UserRole } from '../constants/roles';

export interface AuthUser {
  id: string;
  userName: string;
  email: string;
  displayName: string;
  displayMail: string;
  role: UserRole;
  staffUnit?: 'pharmacy' | 'laboratory' | 'radiology';
}

const STORAGE_KEY = 'medihelper_auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSignal = signal<AuthUser | null>(this.loadUser());

  readonly user = this.userSignal.asReadonly();
  readonly role = computed(() => this.userSignal()?.role ?? null);
  readonly isAuthenticated = computed(() => !!this.userSignal());

  constructor(private router: Router) {}

  login(userName: string, email: string, password: string, role: UserRole): boolean {
    if (!userName.trim() || !email.trim() || !password.trim()) {
      return false;
    }
    const user: AuthUser = {
      id: 'local-user',
      userName: userName.trim(),
      email: email.trim(),
      displayName: userName,
      displayMail: email,
      role,
    };
    this.userSignal.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.router.navigate([`/${role}/dashboard`]);
    return true;
  }

  logout(): void {
    this.userSignal.set(null);
    localStorage.removeItem(STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  getDashboardPath(): string {
    const r = this.role();
    return r ? `/${r}/dashboard` : '/login';
  }

  hasRole(...roles: UserRole[]): boolean {
    const current = this.role();
    return current !== null && roles.includes(current);
  }

  private loadUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as AuthUser;
      if (Object.values(ROLES).includes(parsed.role)) {
        return parsed;
      }
    } catch {
      /* ignore corrupt storage */
    }
    return null;
  }
}
