// gestor-de-tareas\src\app\guardianes\admin.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (this.authService.getRole() === 'admin' && token && !this.authService.isTokenExpired(token)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}