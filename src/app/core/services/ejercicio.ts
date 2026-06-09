import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ejercicio, EjercicioRequest } from '../models/ejercicio';

@Injectable({
  providedIn: 'root',
})
export class EjercicioService {
  // URL base de la API
  private apiUrl = 'https://localhost:7086/api/ejercicios';

  constructor(private http: HttpClient) {}

  // Obtiene todos los ejercicios
  getAll(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(this.apiUrl);
  }

  // Obtiene un ejercicio por id
  getById(id: number): Observable<Ejercicio> {
    return this.http.get<Ejercicio>(`${this.apiUrl}/${id}`);
  }

  // Crea un nuevo ejercicio
  create(ejercicio: EjercicioRequest): Observable<Ejercicio> {
    return this.http.post<Ejercicio>(this.apiUrl, ejercicio);
  }

  // Actualiza un ejercicio
  update(id: number, ejercicio: EjercicioRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, ejercicio);
  }

  // Elimina un ejercicio
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
