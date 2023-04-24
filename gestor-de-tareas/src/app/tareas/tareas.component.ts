// src\app\servicios\tareas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private apiUrl = 'http://localhost:3000/api/tasks';
  
  constructor(private http: HttpClient) { }

  createTask(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTask(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateTask(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
