import { Injectable } from '@angular/core';

export abstract class AuthService {
  abstract login(user: string, password: string): boolean;
  abstract logout(): void;
  abstract isLoggedIn(): boolean;
}

@Injectable()
export class LocalAuthService extends AuthService {
  login(user: string, password: string): boolean {
    if (user === 'user' && password === 'password') {
      localStorage.setItem('username', user);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('username') !== null;
  }
}