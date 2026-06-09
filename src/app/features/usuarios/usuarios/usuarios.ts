import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario';
import { Usuario } from '../../../core/models/usuario';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-usuarios',
  imports: [ReactiveFormsModule, RouterLink, DatePipe, LucideAngularModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  busqueda: string = '';
  usuarioForm: FormGroup;
  usuarioSeleccionado: Usuario | null = null;
  error: string = '';
  success: string = '';
  mostrarFormulario: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['Cliente', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.usuariosFiltrados = data;
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Error al cargar los usuarios'
    });
  }

  // Filtra usuarios por nombre o email
  filtrar(event: Event): void {
    const texto = (event.target as HTMLInputElement).value.toLowerCase();
    this.busqueda = texto;
    this.usuariosFiltrados = this.usuarios.filter(u =>
      u.nombre.toLowerCase().includes(texto) ||
      u.email.toLowerCase().includes(texto)
    );
  }

  editarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.usuarioForm.patchValue({
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    });
    this.mostrarFormulario = true;
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) return;

    if (this.usuarioSeleccionado) {
      this.usuarioService.update(this.usuarioSeleccionado.id, this.usuarioForm.value).subscribe({
        next: () => {
          this.success = 'Usuario actualizado correctamente';
          this.mostrarFormulario = false;
          this.cdr.detectChanges();
          this.cargarUsuarios();
        },
        error: () => this.error = 'Error al actualizar el usuario'
      });
    }
  }

  eliminarUsuario(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    this.usuarioService.delete(id).subscribe({
      next: () => {
        this.success = 'Usuario eliminado correctamente';
        this.cargarUsuarios();
      },
      error: () => this.error = 'Error al eliminar el usuario'
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.usuarioForm.reset();
  }
}