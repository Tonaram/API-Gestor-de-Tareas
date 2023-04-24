// src\app\tareas\tareas.component.ts

import { Component, OnInit } from '@angular/core';
import { TareasService } from '../servicios/tareas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {
  taskForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  displayedColumns: string[] = ['nombre', 'descripcion', 'fechaInicio', 'fechaFin', 'estado', 'acciones'];
  tasks: any[] = [];

  constructor(
    private fb: FormBuilder,
    private tareasService: TareasService
  ) {
    this.taskForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateTasksList();
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

  updateTasksList(): void {
    this.tareasService.getTasks().subscribe(
      (response) => {
        this.tasks = response;
      },
      (error) => {
        console.error('Error al obtener tareas:', error);
        this.errorMessage = 'Hubo un error al cargar la lista de tareas';
      }
    );
  }
}
