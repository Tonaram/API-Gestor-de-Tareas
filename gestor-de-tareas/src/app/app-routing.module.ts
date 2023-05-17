// gestor-de-tareas\src\app\app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { TareasComponent } from './tareas/tareas.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guardianes/auth.guard';
import { AdminGuard } from './guardianes/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/proyectos', pathMatch: 'full'},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard] },
  { path: 'proyectos', component: ProyectosComponent, canActivate: [AuthGuard] },
  { path: 'tareas', component: TareasComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }