// gestor-de-tareas\src\app\guardianes\auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (this.authService.isLoggedIn() && token && !this.authService.isTokenExpired(token)) {
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }
}