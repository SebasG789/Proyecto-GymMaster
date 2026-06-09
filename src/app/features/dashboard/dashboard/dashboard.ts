import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  nombre: string = '';
  rol: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.nombre = this.authService.getNombre();
    this.rol = this.authService.getRol();
  }

  logout(): void {
    this.authService.logout();
  }

  esAdmin(): boolean {
    return this.rol === 'Admin';
  }

  esEntrenador(): boolean {
    return this.rol === 'Entrenador';
  }

  esCliente(): boolean {
    return this.rol === 'Cliente';
  }

}
