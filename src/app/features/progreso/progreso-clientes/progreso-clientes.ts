import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario';
import { ProgresoService } from '../../../core/services/progreso';
import { PerfilService } from '../../../core/services/perfil';
import { Usuario } from '../../../core/models/usuario';
import { Progreso } from '../../../core/models/progreso';
import { Perfil } from '../../../core/models/perfil';
import { DatePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-progreso-clientes',
  imports: [RouterLink,DatePipe, LucideAngularModule],
  templateUrl: './progreso-clientes.html',
  styleUrl: './progreso-clientes.css',
})
export class ProgresoClientesComponent implements OnInit {
  clientes: Usuario[] = [];
  progresosCliente: Progreso[] = [];
  perfilCliente: Perfil | null = null;
  clienteSeleccionado: Usuario | null = null;

  // Vista activa: 'lista', 'progreso', 'perfil'
  vistaActiva: string = 'lista';

  error: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private progresoService: ProgresoService,
    private perfilService: PerfilService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.usuarioService.getAll().subscribe({
      next: (data) => {
        this.clientes = data.filter(u => u.rol === 'Cliente');
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Error al cargar los clientes'
    });
  }

  verProgreso(cliente: Usuario): void {
    this.clienteSeleccionado = cliente;
    this.vistaActiva = 'progreso';
    this.progresoService.getByCliente(cliente.id).subscribe({
      next: (data) => {
        this.progresosCliente = data;
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Error al cargar el progreso'
    });
  }

  verPerfil(cliente: Usuario): void {
    this.clienteSeleccionado = cliente;
    this.vistaActiva = 'perfil';
    this.perfilService.getByUsuarioId(cliente.id).subscribe({
      next: (data) => {
        this.perfilCliente = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.perfilCliente = null;
        this.error = 'Este cliente no tiene perfil registrado';
        this.cdr.detectChanges();
      }
    });
  }

  volver(): void {
    this.clienteSeleccionado = null;
    this.progresosCliente = [];
    this.perfilCliente = null;
    this.vistaActiva = 'lista';
    this.error = '';
  }
}
