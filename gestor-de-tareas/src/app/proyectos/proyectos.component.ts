// src\app\proyectos\proyectos.component.ts

import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../servicios/proyectos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {
  projectForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  displayedColumns: string[] = ['nombre', 'descripcion', 'fechaInicio', 'fechaFin', 'estado', 'acciones'];
  projects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private proyectosService: ProyectosService
  ) {
    this.projectForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateProjectsList();
  }

  ngOnSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    this.proyectosService.createProject(this.projectForm.value).subscribe(
      (response) => {
        console.log('Proyecto creado:', response);
        this.successMessage = 'Proyecto creado con éxito';
        this.projectForm.reset();
        this.updateProjectsList();
      },
      (error) => {
        console.error('Error al crear proyecto:', error);
        this.errorMessage = 'Hubo un error al crear el proyecto';
      }
    );
  }

  updateProjectsList(): void {
    this.proyectosService.getProjects().subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => {
        console.error('Error al obtener proyectos:', error);
        this.errorMessage = 'Hubo un error al cargar la lista de proyectos';
      }
    );
  }
}