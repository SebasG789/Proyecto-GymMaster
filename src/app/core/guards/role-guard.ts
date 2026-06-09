import { inject } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
 const authService = inject(AuthService);
  const router = inject(Router);

  // Roles permitidos definidos en la ruta
  const rolesPermitidos: string[] = route.data['roles'] || [];
  const rolUsuario = authService.getRol();

  // Verifica si el rol del usuario está en los roles permitidos
  if (rolesPermitidos.includes(rolUsuario)) {
    return true;
  }

  // Si no tiene permiso redirige a página de acceso denegado
  router.navigate(['/forbidden']);
  return false;
};
