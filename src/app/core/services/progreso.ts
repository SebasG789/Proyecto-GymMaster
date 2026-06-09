import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Progreso, ProgresoRequest } from '../models/progreso';

@Injectable({
  providedIn: 'root',
})
export class ProgresoService {
  // URL base de la API
  private apiUrl = 'https://localhost:7086/api/progreso';

  constructor(private http: HttpClient) {}

  // Obtiene el progreso de un cliente
  getByCliente(clienteId: number): Observable<Progreso[]> {
    return this.http.get<Progreso[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  // Obtiene un registro por id
  getById(id: number): Observable<Progreso> {
    return this.http.get<Progreso>(`${this.apiUrl}/${id}`);
  }

  // Crea un nuevo registro de progreso
  create(progreso: ProgresoRequest): Observable<Progreso> {
    return this.http.post<Progreso>(this.apiUrl, progreso);
  }

  // Actualiza un registro
  update(id: number, progreso: ProgresoRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, progreso);
  }

  // Elimina un registro
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
