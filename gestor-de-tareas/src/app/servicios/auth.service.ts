// gestor-de-tareas\src\app\servicios\auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string | null = null;
  private jwtHelper: JwtHelperService;

  constructor(private http: HttpClient, private router: Router) { 
    this.jwtHelper = new JwtHelperService();
  }

  register(nombre: string, email: string, contraseña: string, imagen: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/users', { nombre, email, contraseña, imagen }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }  

  login(email: string, contraseña: string): void {
    this.http.post('http://localhost:3000/api/auth/login', {email, contraseña}).pipe(
      catchError((error) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    ).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/proyectos']);
      },
      error => {
        console.log(error);
      }
    );
  }

  googleLogin(): void {
    window.location.href = 'http://localhost:3000/api/auth/google';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.role;
  }

  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }
}