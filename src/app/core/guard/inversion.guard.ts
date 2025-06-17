import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';



/*Este guard se encarga de reenviarnos al home mientras no haya un cliente seleccionado esto evita que si se recarga la 
página en cualquier interfaz esta se muestre sin ningún tipo de datos.  */
export const inversionGuard: CanActivateFn = (route, state) => {
  const cliente = inject(ClienteService);
  const router = inject(Router);

  if (!cliente.clienteSeleccionado) {
    router.navigate(['login']);
    return false;
  }

  return true;
};
