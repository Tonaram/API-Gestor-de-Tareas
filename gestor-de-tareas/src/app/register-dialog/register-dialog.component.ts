import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<RegisterDialogComponent>
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required, , Validators.email],
      contraseña: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log('Submitting form');
    if (this.registerForm.valid) {
      const { nombre, email, contraseña, imagen } = this.registerForm.value;
      this.authService.register(nombre, email, contraseña, imagen).subscribe((response) => {
        this.dialogRef.close();
        
        this.authService.login(email, contraseña);
      });
    }
  }
}