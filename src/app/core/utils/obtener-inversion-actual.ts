import { inject } from "@angular/core";
import { Inversion } from "../../models/Inversion";
import { ClienteService } from "../../services/cliente.service";
import { InversionesCuentasService } from "../../services/inversiones-cuentas.service";
import { InversionesService } from "../../services/inversiones.service";


export class TraerInversion {
  protected inversionActual!: Inversion | null;
  clienteServicio = inject(ClienteService);
  servicioInversionCuenta = inject(InversionesCuentasService)
  idCuentaSeleccionada =  this.clienteServicio.cuentaSeleccionada?.id

  protected suscribirseAInversion(servicioInversiones: InversionesService) {
    servicioInversiones.inversionActual$.subscribe({
      next: (data) => {
        this.inversionActual = data
        if (this.inversionActual && this.idCuentaSeleccionada) {
          this.servicioInversionCuenta.inversionCuentaActual.idInversion = { idInversion: this.inversionActual.idInversion };
          this.servicioInversionCuenta.inversionCuentaActual.idCuenta = {idCuenta: this.idCuentaSeleccionada}
        }
      },
      error: (error) => console.log('Error:', error),
    });
  }
}
