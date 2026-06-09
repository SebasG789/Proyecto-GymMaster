export interface Ejercicio {
    id: number;
    nombre: string;
    series: number;
    repeticiones: string;
    pesoKg: number;
    dia: string;
}

export interface EjercicioRequest {
  nombre: string;
  series: number;
  repeticiones: string;
  pesoKg: number;
  dia: string;
  rutinaId: number;
}
