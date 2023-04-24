import { Component, OnInit } from '@angular/core';
import { TareasService } from '../servicios/tareas.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})

export class TareasComponent implements OnInit {
  tasks: any[] = [];

  constructor(private tareasService: TareasService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tareasService.getTasks().subscribe(
      data => {
        this.tasks = data;
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
}
