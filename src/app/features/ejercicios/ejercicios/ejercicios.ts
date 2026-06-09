import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EjercicioService } from '../../../core/services/ejercicio';
import { Ejercicio, EjercicioRequest } from '../../../core/models/ejercicio';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-ejercicios',
  imports: [ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './ejercicios.html',
  styleUrl: './ejercicios.css',
})
export class EjerciciosComponent implements OnInit {

  ejercicios: Ejercicio[] = [];
  ejerciciosFiltrados: Ejercicio[] = [];
  busqueda: string = '';
  ejercicioForm: FormGroup;
  ejercicioSeleccionado: Ejercicio | null = null;
  error: string = '';
  success: string = '';
  mostrarFormulario: boolean = false;

  // Paginación
  paginaActual = 1;
  itemsPorPagina = 8;

  constructor(
    private ejercicioService: EjercicioService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.ejercicioForm = this.fb.group({
      nombre: ['', Validators.required],
      series: [1, [Validators.required, Validators.min(1)]],
      repeticiones: ['', Validators.required],
      pesoKg: [0, Validators.required],
      dia: ['', Validators.required],
      rutinaId: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarEjercicios();
  }

  cargarEjercicios(): void {
    this.ejercicioService.getAll().subscribe({
      next: (data) => {
        this.ejercicios = data;
        this.ejerciciosFiltrados = data;
        this.paginaActual = 1;
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Error al cargar los ejercicios'
    });
  }

  // Filtra ejercicios por nombre o día
  filtrar(event: Event): void {
    const texto = (event.target as HTMLInputElement).value.toLowerCase();
    this.busqueda = texto;
    this.ejerciciosFiltrados = this.ejercicios.filter(e =>
      e.nombre.toLowerCase().includes(texto) ||
      e.dia.toLowerCase().includes(texto)
    );
    this.paginaActual = 1;
  }

  // Paginación
  ejerciciosPaginados(): Ejercicio[] {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.ejerciciosFiltrados.slice(inicio, inicio + this.itemsPorPagina);
  }

  totalPaginas(): number {
    return Math.ceil(this.ejerciciosFiltrados.length / this.itemsPorPagina);
  }

  getPaginas(): number[] {
    return Array.from({ length: this.totalPaginas() }, (_, i) => i + 1);
  }

  irAPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas()) return;
    this.paginaActual = pagina;
  }

  nuevoEjercicio(): void {
    this.ejercicioSeleccionado = null;
    this.ejercicioForm.reset({ series: 1, repeticiones: 1, pesoKg: 0 });
    this.mostrarFormulario = true;
  }

  editarEjercicio(ejercicio: Ejercicio): void {
    this.ejercicioSeleccionado = ejercicio;
    this.ejercicioForm.patchValue(ejercicio);
    this.mostrarFormulario = true;
  }

  onSubmit(): void {
    if (this.ejercicioForm.invalid) return;
    const data: EjercicioRequest = this.ejercicioForm.value;

    if (this.ejercicioSeleccionado) {
      this.ejercicioService.update(this.ejercicioSeleccionado.id, data).subscribe({
        next: () => {
          this.success = 'Ejercicio actualizado correctamente';
          this.mostrarFormulario = false;
          this.cdr.detectChanges();
          this.cargarEjercicios();
        },
        error: () => this.error = 'Error al actualizar el ejercicio'
      });
    } else {
      this.ejercicioService.create(data).subscribe({
        next: () => {
          this.success = 'Ejercicio creado correctamente';
          this.mostrarFormulario = false;
          this.cargarEjercicios();
        },
        error: () => this.error = 'Error al crear el ejercicio'
      });
    }
  }

  eliminarEjercicio(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este ejercicio?')) return;
    this.ejercicioService.delete(id).subscribe({
      next: () => {
        this.success = 'Ejercicio eliminado correctamente';
        this.cargarEjercicios();
      },
      error: () => this.error = 'Error al eliminar el ejercicio'
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.ejercicioForm.reset();
  }
}