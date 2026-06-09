import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  // Ruta por defecto redirige al login
  { path: '', redirectTo: 'landing', pathMatch: 'full' },

  // Landing page — pública
  {
    path: 'landing',
    loadComponent: () => import('./features/landing/landing/landing').then(m => m.LandingComponent)
  },

  // Rutas de autenticación (sin guard)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },

  // Rutas protegidas por autenticación
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard/dashboard').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },

  // Rutinas — Admin y Entrenador
  {
    path: 'rutinas',
    loadComponent: () => import('./features/rutinas/rutinas/rutinas').then(m => m.RutinasComponent),
    canActivate: [authGuard],

  },

  // Ejercicios — Admin y Entrenador
  {
    path: 'ejercicios',
    loadComponent: () => import('./features/ejercicios/ejercicios/ejercicios').then(m => m.EjerciciosComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Admin', 'Entrenador'] }
  },

  // Progreso — todos los roles autenticados
  {
    path: 'progreso',
    loadComponent: () => import('./features/progreso/progreso/progreso').then(m => m.ProgresoComponent),
    canActivate: [authGuard]
  },

  // Usuarios — solo Admin
  {
    path: 'usuarios',
    loadComponent: () => import('./features/usuarios/usuarios/usuarios').then(m => m.UsuariosComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Admin'] }
  },

  // Perfil — todos los usuarios autenticados
  {
    path: 'perfil',
    loadComponent: () => import('./features/perfil/perfil/perfil').then(m => m.PerfilComponent),
    canActivate: [authGuard]
  },
  // Progreso clientes — Admin y Entrenador
  {
    path: 'progreso-clientes',
    loadComponent: () => import('./features/progreso/progreso-clientes/progreso-clientes').then(m => m.ProgresoClientesComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Admin', 'Entrenador'] }
  },

  // Página de acceso denegado
  {
    path: 'forbidden',
    loadComponent: () => import('./shared/components/forbidden/forbidden/forbidden').then(m => m.ForbiddenComponent)
  },

  // Ruta no encontrada
  { path: '**', redirectTo: 'auth/login' }
];
