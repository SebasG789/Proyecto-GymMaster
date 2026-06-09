import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgresoService } from '../../../core/services/progreso';
import { Progreso, ProgresoRequest } from '../../../core/models/progreso';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-progreso',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe, DatePipe, LucideAngularModule],
  templateUrl: './progreso.html',
  styleUrl: './progreso.css',
})
export class ProgresoComponent implements OnInit {
  registros$!: Observable<Progreso[]>;
  progresoForm: FormGroup;
  registroSeleccionado: Progreso | null = null;
  error: string = '';
  success: string = '';
  mostrarFormulario: boolean = false;
  clienteId: number = 1;

  constructor(
    private progresoService: ProgresoService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    // Lee el id del usuario desde el token JWT
    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('payload:', payload);
      this.clienteId = parseInt(payload['sub']);
    }

    this.progresoForm = this.fb.group({
      peso: [0, [Validators.required, Validators.min(1)]],
      notas: [''],
      clienteId: [this.clienteId, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarProgreso();
  }

  cargarProgreso(): void {
    this.registros$ = this.progresoService.getByCliente(this.clienteId);
  }

  nuevoRegistro(): void {
    this.registroSeleccionado = null;
    this.progresoForm.reset({ peso: 0, clienteId: this.clienteId });
    this.mostrarFormulario = true;
  }

  editarRegistro(registro: Progreso): void {
    this.registroSeleccionado = registro;
    this.progresoForm.patchValue(registro);
    this.mostrarFormulario = true;
  }

  onSubmit(): void {
    if (this.progresoForm.invalid) return;

    const data: ProgresoRequest = this.progresoForm.value;

    if (this.registroSeleccionado) {
      this.progresoService.update(this.registroSeleccionado.id, data).subscribe({
        next: () => {
          this.success = 'Registro actualizado correctamente';
          this.mostrarFormulario = false;
          this.cargarProgreso();
        },
        error: () => this.error = 'Error al actualizar el registro'
      });
    } else {
      this.progresoService.create(data).subscribe({
        next: () => {
          this.success = 'Registro creado correctamente';
          this.mostrarFormulario = false;
          this.cargarProgreso();
        },
        error: () => this.error = 'Error al crear el registro'
      });
    }
  }

  eliminarRegistro(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este registro?')) return;

    this.progresoService.delete(id).subscribe({
      next: () => {
        this.success = 'Registro eliminado correctamente';
        this.cargarProgreso();
      },
      error: () => this.error = 'Error al eliminar el registro'
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.progresoForm.reset();
  }
}
