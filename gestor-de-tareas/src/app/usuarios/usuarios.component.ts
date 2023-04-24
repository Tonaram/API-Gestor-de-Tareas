// src\app\usuarios\usuarios.component.ts

import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent implements OnInit {
  userForm: FormGroup;
  successMessage: string | null = null; // Agrega una variable para el mensaje de éxito
  errorMessage: string | null = null; // Agrega una variable para el mensaje de error
  displayedColumns: string[] = ['nombre', 'email', 'acciones'];
  users: any[] = []; // Agrega una variable para almacenar la lista de usuarios

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService
  ) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateUsersList(); // Actualiza la lista de usuarios al inicio
  }

  ngOnSubmit(): void {
    this.successMessage = null; // Reinicia el mensaje de éxito
    this.errorMessage = null; // Reinicia el mensaje de error

    this.usuariosService.createUser(this.userForm.value).subscribe(
      (response) => {
        console.log('Usuario creado:', response);
        this.successMessage = 'Usuario creado con éxito'; // Muestra el mensaje de éxito
        this.userForm.reset(); // Limpia el formulario
        this.updateUsersList(); // Actualiza la lista de usuarios
      },
      (error) => {
        console.error('Error al crear usuario:', error);
        this.errorMessage = 'Hubo un error al crear el usuario'; // Muestra el mensaje de error
      }
    );
  }

  // Agrega una función para actualizar la lista de usuarios
  updateUsersList(): void {
    this.usuariosService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
        this.errorMessage = 'Hubo un error al cargar la lista de usuarios';
      }
    );
  }
}