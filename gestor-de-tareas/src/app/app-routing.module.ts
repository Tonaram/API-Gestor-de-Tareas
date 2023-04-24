import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { TareasComponent } from './tareas/tareas.component';

const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full'},
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'tareas', component: TareasComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }