import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';

export const authRoutes: Routes = [
  // Ruta por defecto de auth redirige al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Pantalla de login
  { path: 'login', component: LoginComponent },

  // Pantalla de registro
  { path: 'register', component: RegisterComponent }
];