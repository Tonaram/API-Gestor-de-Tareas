// src\app\servicios\proyectos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class ProyectosService {
  private apiUrl = 'http://localhost:3000/api/projects';
  
  constructor(private http: HttpClient) { }

  createProject(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getProjects(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProject(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateProject(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

