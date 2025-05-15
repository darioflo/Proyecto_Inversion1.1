import { inject } from "@angular/core";
import { Inversion } from "../../models/Inversion";
import { ClienteService } from "../../services/cliente.service";
import { InversionesCuentasService } from "../../services/inversiones-cuentas.service";
import { InversionesService } from "../../services/inversiones.service";


export class TraerInversion {
  protected inversionActual!: Inversion | null;
  clienteServicio = inject(ClienteService);
  servicioInversioCuenta = inject(InversionesCuentasService)
  inversionCuentaActual = this.servicioInversioCuenta.inversionCuentaActual
  idCuentaSeleccionada =  this.clienteServicio.cuentaSeleccionada?.idCuenta

  protected suscribirseAInversion(servicioInversiones: InversionesService) {
    servicioInversiones.inversionActual$.subscribe({
      next: (data) => {
        (this.inversionActual = data)
          if (this.inversionCuentaActual && this.inversionActual?.idInversion !== undefined) {
            this.inversionCuentaActual.idInversion = { idInversion: this.inversionActual.idInversion };
            this.inversionCuentaActual.idCuenta = {idCuenta: this.idCuentaSeleccionada!}
          }
      },
      error: (error) => console.log('Error:', error),
    });
  }
}
