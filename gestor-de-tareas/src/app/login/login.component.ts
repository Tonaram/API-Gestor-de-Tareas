// gestor-de-tareas\src\app\login\login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      contraseña: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        localStorage.setItem('token', token);
        this.router.navigate(['/proyectos']);
      }
    });
  }

  onSubmit(): void {
    console.log('Submitting form');
    if (this.loginForm.valid) {
      const { email, contraseña } = this.loginForm.value;
      this.authService.login(email, contraseña) 
    }
  }

  googleLogin(): void {
    this.authService.googleLogin();
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }  
}