// src\app\usuarios\usuarios.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent implements OnInit {
  userForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  displayedColumns: string[] = ['nombre', 'email', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  users!: MatTableDataSource<any>;

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

  onEdit(user: any): void {
    if (user.editMode) {
      // si está en modo edición, actualiza el usuario
      this.usuariosService.updateUser(user._id, user).subscribe(
        () => {
          this.successMessage = 'User updated successfully';
          user.editMode = false; // Sale del modo edición
        },
        error => {
          console.error('Error updating user:', error);
          this.errorMessage = 'Error updating user';
        }
      );
    } else {
      // si no está en modo edición, entra en modo edición
      user.editMode = true;
    }
  }
  
  onDelete(user: any): void {
    console.log(user);
    if (confirm('Are you sure you want to delete this user?')) {
      this.usuariosService.deleteUser(user._id).subscribe(
        () => {
          this.successMessage = 'User deleted successfully';
          this.updateUsersList();
        },
        error => {
          console.error('Error deleting user:', error);
          this.errorMessage = 'Error deleting user';
        }
      );
    }
  }

  // Agrega una función para actualizar la lista de usuarios
  updateUsersList(): void {
    this.usuariosService.getUsers().subscribe(
      (response) => {
        this.users = new MatTableDataSource(response);
        this.users.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
        this.errorMessage = 'Hubo un error al cargar la lista de usuarios';
      }
    );
  }
}