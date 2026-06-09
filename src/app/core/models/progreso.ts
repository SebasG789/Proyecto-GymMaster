export interface Progreso {
    id: number;
    fecha: Date;
    peso: number;
    notas: string;
    clienteId: number;
}

export interface ProgresoRequest {
  peso: number;
  notas: string;
  clienteId: number;
}