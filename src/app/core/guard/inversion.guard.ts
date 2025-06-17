import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../../services/auth-service.service';
import { ClienteService } from '../../services/cliente.service';



export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AutenticacionService);
  const router = inject(Router);
  const clienteServicio = inject(ClienteService)

  if (!auth.estaAutenticado() && !clienteServicio.clienteSeleccionado ) {
    router.navigate(['/']);
    return false;
  }

  if (auth.estaAutenticado() && !clienteServicio.clienteSeleccionado) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};