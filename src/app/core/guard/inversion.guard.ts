import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';

export const inversionGuard: CanActivateFn = (route, state) => {
  const cliente = inject(ClienteService);
  const router = inject(Router);

  if (!cliente.clienteSeleccionado) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
