// src\app\tareas\tareas.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { TareasService } from '../servicios/tareas.service';
import { ProyectosService } from '../servicios/proyectos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {
  taskForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  displayedColumns: string[] = ['nombre', 'descripcion', 'fechaInicio', 'fechaFin', 'estado', 'proyecto', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tasks!: MatTableDataSource<any>;
  userProjects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private tareasService: TareasService,
    private proyectosService: ProyectosService
  ) {
    this.taskForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['', Validators.required],
      proyecto: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateTasksList();
    this.proyectosService.getProjects().subscribe(
      (response) => {
        this.userProjects = response;
      },
      (error) => {
        console.error('Error al obtener proyectos:', error);
        this.errorMessage = 'Hubo un error al cargar la lista de proyectos';
      }
    );
  }

  ngOnSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    this.tareasService.createTask(this.taskForm.value).subscribe(
      (response) => {
        console.log('Tarea creada:', response);
        this.successMessage = 'Tarea creada con éxito';
        this.taskForm.reset();
        this.updateTasksList();
      },
      (error) => {
        console.error('Error al crear tarea:', error);
        this.errorMessage = 'Hubo un error al crear la tarea';
      }
    );
  }

  onEdit(task: any): void {
    if (task.editMode) {

      this.tareasService.updateTask(task._id, task).subscribe(
        () => {
          this.successMessage = 'Task updated successfully';
          task.editMode = false;
        },
        error => {
          console.error('Error updating task:', error);
          this.errorMessage = 'Error updating task';
        }
      );
    } else {
      
      task.editMode = true;
    }
  }
  
  onDelete(task: any): void {
    console.log(task);
    if (confirm('Are you sure you want to delete this task?')) {
      this.tareasService.deleteTask(task._id).subscribe(
        () => {
          this.successMessage = 'Task deleted successfully';
          this.updateTasksList();
        },
        error => {
          console.error('Error deleting task:', error);
          this.errorMessage = 'Error deleting task';
        }
      );
    }
  }

  updateTasksList(): void {
    this.tareasService.getTasks().subscribe(
      (response) => {
        this.tasks = new MatTableDataSource(response);
        this.tasks.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener tareas:', error);
        this.errorMessage = 'Hubo un error al cargar la lista de tareas';
      }
    );
  }
}
