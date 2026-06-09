import { Ejercicio } from './ejercicio';

export interface Rutina {
    id: number;
    nombre: string;
    descripcion: string;
    diasSemana: number;
    fechaCreacion: Date;
    clienteId: number;
    nombreCliente: string;
    ejercicios: Ejercicio[];
}

export interface RutinaRequest {
  nombre: string;
  descripcion: string;
  diasSemana: number;
  clienteId: number;
}
