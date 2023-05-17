// gestor-de-tareas\src\app\app.component.ts
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthService } from './servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestor-de-tareas';
  showHeader = true;

  constructor(private authService: AuthService, private router: Router) { }

  onActivate(event: any) {
    this.showHeader = !(event instanceof LoginComponent);
  }

  isAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
