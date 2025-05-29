import { inject, Injectable } from '@angular/core';
import { InversionesService } from './inversiones.service';
import { ClienteService } from './cliente.service';
import { Inversion } from '../models/Inversion';
import { InversionesCuentasService } from './inversiones-cuentas.service';
import { InversionCuenta } from '../models/Inversion_Cuenta';

@Injectable({
  providedIn: 'root'
})
export class InstruccionVencimientoService {

  clienteActual = inject(ClienteService)


  reinvertirInversionGanancia(saldoInvertido: number, rendimientoAnual: number, inversionActual: InversionCuenta) {
    if (inversionActual.saldoInicial && this.clienteActual.cuentaSeleccionada && inversionActual.saldoAlTermino) {
      inversionActual.saldoInicial  += rendimientoAnual
      inversionActual.saldoAlTermino += this.clienteActual.cuentaSeleccionada.saldo;
      this.clienteActual.cuentaSeleccionada.saldo -= saldoInvertido
    }
    return 0;
  }

  reinvertirInversion(saldoInvertido: number, rendimientoAnual: number,inversionActual: InversionCuenta) {
    if (inversionActual && this.clienteActual.cuentaSeleccionada && inversionActual.saldoInicial ) {
      inversionActual.saldoInicial += saldoInvertido 
      inversionActual.saldoAlTermino = this.clienteActual.cuentaSeleccionada.saldo + rendimientoAnual;
      this.clienteActual.cuentaSeleccionada.saldo -= saldoInvertido
    }
    return 0;
  }

  reembolsarTodo(saldoInvertido: number, rendimientoAnual: number,inversionActual: InversionCuenta) {
    if (inversionActual && this.clienteActual.cuentaSeleccionada && inversionActual.saldoAlTermino) {
      inversionActual.saldoAlTermino += saldoInvertido + rendimientoAnual + this.clienteActual.cuentaSeleccionada.saldo;
      this.clienteActual.cuentaSeleccionada.saldo -= saldoInvertido
    }
    return 0;
  }

}
