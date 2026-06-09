import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PerfilService } from '../../../core/services/perfil';
import { AuthService } from '../../../core/services/auth';
import { Perfil, PerfilRequest } from '../../../core/models/perfil';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-perfil',
  imports: [ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class PerfilComponent implements OnInit {
  perfil: Perfil | null = null;
  perfilForm: FormGroup;
  usuarioId: number = 0;
  nombreUsuario: string = '';
  error: string = '';
  success: string = '';
  mostrarFormulario: boolean = false;
  tienePerfil: boolean = false;

  constructor(
    private perfilService: PerfilService,
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.usuarioId = parseInt(payload['sub']);
      this.nombreUsuario = payload['nombre'];
    }

    this.perfilForm = this.fb.group({
      edad: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      peso: [0, [Validators.required, Validators.min(1)]],
      altura: [0, [Validators.required, Validators.min(1)]],
      objetivo: ['', Validators.required],
      usuarioId: [this.usuarioId]
    });
  }

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.perfilService.getByUsuarioId(this.usuarioId).subscribe({
      next: (data) => {
        this.perfil = data;
        this.tienePerfil = true;
        this.perfilForm.patchValue(data);
        this.cdr.detectChanges(); // Fuerza la detección de cambios
      },
      error: (e) => {
        console.log('error:', e);
        this.tienePerfil = false;
        this.mostrarFormulario = true;
        this.cdr.detectChanges();
      }
    });
  }

  editarPerfil(): void {
    this.mostrarFormulario = true;
  }

  onSubmit(): void {
    if (this.perfilForm.invalid) return;

    this.perfilForm.disable();

    const data: PerfilRequest = this.perfilForm.value;

    if (this.tienePerfil) {
      this.perfilService.update(this.usuarioId, data).subscribe({
        next: () => {
          this.success = 'Perfil actualizado correctamente';
          this.mostrarFormulario = false;
          this.perfilForm.enable();
          this.cargarPerfil();
        },
        error: () => {
          this.error = 'Error al actualizar el perfil';
          this.perfilForm.enable();
        }
      });
    } else {
      this.perfilService.create(data).subscribe({
        next: (perfil) => {
          this.perfil = perfil;
          this.tienePerfil = true;
          this.success = 'Perfil creado correctamente';
          this.mostrarFormulario = false;
          this.perfilForm.enable();
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'Error al crear el perfil';
          this.perfilForm.enable();
        }
      });
    }
  }

  cancelar(): void {
    this.mostrarFormulario = false;
  }
}
