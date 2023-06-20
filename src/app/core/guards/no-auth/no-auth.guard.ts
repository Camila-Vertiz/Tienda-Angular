import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private readonly router: Router
  ) {}

  public async canActivate(): Promise<boolean> {
    const user = localStorage.getItem('id_user');
    if (user) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
