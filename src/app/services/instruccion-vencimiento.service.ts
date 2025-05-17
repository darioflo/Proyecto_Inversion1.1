import { inject, Injectable } from '@angular/core';
import { InversionesService } from './inversiones.service';
import { ClienteService } from './cliente.service';
import { Inversion } from '../models/Inversion';

@Injectable({
  providedIn: 'root'
})
export class InstruccionVencimientoService {

  servicioInversion = inject(InversionesService);
  clienteActual = inject(ClienteService)


  reinvertirInversionGanancia(saldoInvertido: number, rendimientoAnual: number, inversionActual: Inversion) {
    if (inversionActual && this.clienteActual.cuentaSeleccionada) {
      inversionActual.saldoInicial += rendimientoAnual
      inversionActual.saldoAlTermino += this.clienteActual.cuentaSeleccionada.saldo;
      this.clienteActual.cuentaSeleccionada.saldo -= saldoInvertido
    }
    return 0;
  }

  reinvertirInversion(saldoInvertido: number, rendimientoAnual: number,inversionActual: Inversion) {
    if (inversionActual && this.clienteActual.cuentaSeleccionada) {
      inversionActual.saldoInicial += saldoInvertido 
      inversionActual.saldoAlTermino = this.clienteActual.cuentaSeleccionada.saldo + rendimientoAnual;
      this.clienteActual.cuentaSeleccionada.saldo -= saldoInvertido
    }
    return 0;
  }

  reembolsarTodo(saldoInvertido: number, rendimientoAnual: number,inversionActual: Inversion) {
    if (inversionActual && this.clienteActual.cuentaSeleccionada) {
      inversionActual.saldoAlTermino += saldoInvertido + rendimientoAnual + this.clienteActual.cuentaSeleccionada.saldo;
      this.clienteActual.cuentaSeleccionada.saldo -= saldoInvertido
    }
    return 0;
  }

}
