import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RutinaService } from '../../../core/services/rutina';
import { AuthService } from '../../../core/services/auth';
import { Rutina, RutinaRequest } from '../../../core/models/rutina';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-rutinas',
  imports: [ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './rutinas.html',
  styleUrl: './rutinas.css',
})
export class RutinasComponent implements OnInit {

  rutinas: Rutina[] = [];
  rutinasFiltradas: Rutina[] = [];
  busqueda: string = '';
  rutinaForm: FormGroup;
  rutinaSeleccionada: Rutina | null = null;
  error: string = '';
  success: string = '';
  mostrarFormulario: boolean = false;
  rol: string = '';
  clienteId: number = 0;

  constructor(
    private rutinaService: RutinaService,
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.rol = this.authService.getRol();

    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.clienteId = parseInt(payload['sub']);
    }

    this.rutinaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      diasSemana: [1, [Validators.required, Validators.min(1), Validators.max(7)]],
      clienteId: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarRutinas();
  }

  esCliente(): boolean {
    return this.rol === 'Cliente';
  }

  cargarRutinas(): void {
    const obs = this.esCliente()
      ? this.rutinaService.getByCliente(this.clienteId)
      : this.rutinaService.getAll();

    obs.subscribe({
      next: (data) => {
        this.rutinas = data;
        this.rutinasFiltradas = data;
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Error al cargar las rutinas'
    });
  }

  // Filtra rutinas por nombre o descripción
  filtrar(event: Event): void {
    const texto = (event.target as HTMLInputElement).value.toLowerCase();
    this.busqueda = texto;
    this.rutinasFiltradas = this.rutinas.filter(r =>
      r.nombre.toLowerCase().includes(texto) ||
      r.descripcion.toLowerCase().includes(texto)
    );
  }

  nuevaRutina(): void {
    this.rutinaSeleccionada = null;
    this.rutinaForm.reset({ diasSemana: 1, clienteId: 1 });
    this.mostrarFormulario = true;
  }

  editarRutina(rutina: Rutina): void {
    this.rutinaSeleccionada = rutina;
    this.rutinaForm.patchValue({
      nombre: rutina.nombre,
      descripcion: rutina.descripcion,
      diasSemana: rutina.diasSemana,
      clienteId: rutina.clienteId
    });
    this.mostrarFormulario = true;
  }

  onSubmit(): void {
    if (this.rutinaForm.invalid) return;

    const data: RutinaRequest = this.rutinaForm.value;

    if (this.rutinaSeleccionada) {
      this.rutinaService.update(this.rutinaSeleccionada.id, data).subscribe({
        next: () => {
          this.success = 'Rutina actualizada correctamente';
          this.mostrarFormulario = false;
          this.cdr.detectChanges();
          this.cargarRutinas();
        },
        error: () => this.error = 'Error al actualizar la rutina'
      });
    } else {
      this.rutinaService.create(data).subscribe({
        next: () => {
          this.success = 'Rutina creada correctamente';
          this.mostrarFormulario = false;
          this.cargarRutinas();
        },
        error: () => this.error = 'Error al crear la rutina'
      });
    }
  }

  eliminarRutina(id: number): void {
    if (!confirm('¿Estás seguro de eliminar esta rutina?')) return;

    this.rutinaService.delete(id).subscribe({
      next: () => {
        this.success = 'Rutina eliminada correctamente';
        this.cargarRutinas();
      },
      error: () => this.error = 'Error al eliminar la rutina'
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.rutinaForm.reset();
  }
}