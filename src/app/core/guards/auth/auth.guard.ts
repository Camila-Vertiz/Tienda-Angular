import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router
  ) {}

  public async canActivate(): Promise<boolean> {
    const user = localStorage.getItem('id_user');
    if (user) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
