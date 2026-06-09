import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    // URL base de la API
  private apiUrl = 'https://localhost:7086/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // Inicia sesión y guarda el token en localStorage
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Guarda el token en localStorage
        localStorage.setItem('token', response.token);
      })
    );
  }

  // Registra un nuevo usuario
  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Cierra sesión y redirige al login
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  // Retorna el token guardado
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Decodifica el token y retorna el rol del usuario
  getRol(): string {
    const token = this.getToken();
    if (!token) return '';

    // Decodifica el payload del JWT
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || '';
  }

  // Retorna el nombre del usuario desde el token
  getNombre(): string {
    const token = this.getToken();
    if (!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['nombre'] || '';
  }
}
