import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil, PerfilRequest } from '../models/perfil';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  // URL base de la API
  private apiUrl = 'https://localhost:7086/api/perfil';

  constructor(private http: HttpClient) {}

  // Obtiene el perfil de un usuario
  getByUsuarioId(usuarioId: number): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.apiUrl}/${usuarioId}`);
  }

  // Crea un nuevo perfil
  create(perfil: PerfilRequest): Observable<Perfil> {
    return this.http.post<Perfil>(this.apiUrl, perfil);
  }

  // Actualiza el perfil
  update(usuarioId: number, perfil: PerfilRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${usuarioId}`, perfil);
  }
  
}
