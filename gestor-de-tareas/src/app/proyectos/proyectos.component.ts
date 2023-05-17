// src\app\proyectos\proyectos.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProyectosService } from '../servicios/proyectos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  projects!: MatTableDataSource<any>;

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

  onEdit(project: any): void {
    if (project.editMode) {
      
      this.proyectosService.updateProject(project._id, project).subscribe(
        () => {
          this.successMessage = 'Project updated successfully';
          project.editMode = false; 
        },
        error => {
          console.error('Error updating project:', error);
          this.errorMessage = 'Error updating project';
        }
      );
    } else {
      
      project.editMode = true;
    }
  }
  
  onDelete(project: any): void {
    console.log(project);
    if (confirm('Are you sure you want to delete this project?')) {
      this.proyectosService.deleteProject(project._id).subscribe(
        () => {
          this.successMessage = 'Project deleted successfully';
          this.updateProjectsList();
        },
        error => {
          console.error('Error deleting project:', error);
          this.errorMessage = 'Error deleting project';
        }
      );
    }
  }

  updateProjectsList(): void {
    this.proyectosService.getProjects().subscribe(
      (response) => {
        this.projects = new MatTableDataSource(response);
        this.projects.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener proyectos:', error);
        this.errorMessage = 'Hubo un error al cargar la lista de proyectos';
      }
    );
  }  
}