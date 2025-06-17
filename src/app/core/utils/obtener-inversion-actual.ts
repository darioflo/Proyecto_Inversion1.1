import { inject } from "@angular/core";
import { Inversion } from "../../models/Inversion";
import { ClienteService } from "../../services/cliente.service";
import { InversionesCuentasService } from "../../services/inversiones-cuentas.service";
import { InversionesService } from "../../services/inversiones.service";


export class TraerInversion {
  protected inversionActual!: Inversion | null;
  clienteServicio = inject(ClienteService);
  servicioInversionCuenta = inject(InversionesCuentasService)
  idCuentaSeleccionada =  this.clienteServicio.cuentaSeleccionada?.idCuenta

  protected suscribirseAInversion(servicioInversiones: InversionesService) {
    servicioInversiones.inversionActual$.subscribe({
      next: (data) => {
        this.inversionActual = data
        if (this.inversionActual && this.idCuentaSeleccionada) {
          this.servicioInversionCuenta.inversionCuentaActual.inversion = { idInversion: this.inversionActual.idInversion , nombre: this.inversionActual.nombre };
          this.servicioInversionCuenta.inversionCuentaActual.cuenta = {idCuenta: this.idCuentaSeleccionada, 
            numeroCuenta : this.clienteServicio.cuentaSeleccionada?.numeroCuenta ?? '',
            saldo: this.clienteServicio.cuentaSeleccionada?.saldo ?? 0}
        }
      },
      error: (error) => console.log('Error:', error),
    });
  }
}
