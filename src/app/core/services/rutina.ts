import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rutina, RutinaRequest } from '../models/rutina';

@Injectable({
  providedIn: 'root',
})
export class RutinaService {
  // URL base de la API
  private apiUrl = 'https://localhost:7086/api/rutinas';

  constructor(private http: HttpClient) { }

  // Obtiene todas las rutinas
  getAll(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(this.apiUrl);
  }

  // Obtiene una rutina por id
  getById(id: number): Observable<Rutina> {
    return this.http.get<Rutina>(`${this.apiUrl}/${id}`);
  }
  
  // Obtiene las rutinas de un cliente específico
  getByCliente(clienteId: number): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }
  // Crea una nueva rutina
  create(rutina: RutinaRequest): Observable<Rutina> {
    return this.http.post<Rutina>(this.apiUrl, rutina);
  }

  // Actualiza una rutina
  update(id: number, rutina: RutinaRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, rutina);
  }

  // Elimina una rutina
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
