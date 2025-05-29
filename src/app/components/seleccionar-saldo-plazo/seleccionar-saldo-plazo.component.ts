import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { TraerInversion } from '../../core/utils/obtener-inversion-actual';
import { InversionesService } from '../../services/inversiones.service';
import { ClienteService } from '../../services/cliente.service';
import { ErrorComponentComponent } from "../error-component/error-component.component";
import { TipoError } from '../../models/Error';

@Component({
  selector: 'app-seleccionar-saldo-plazo',
  standalone: true,                     
  imports: [ReactiveFormsModule, NgIf, ErrorComponentComponent],
  templateUrl: './seleccionar-saldo-plazo.component.html',
  styleUrls: ['./seleccionar-saldo-plazo.component.css']
})
export class SeleccionarSaldoPlazoComponent extends TraerInversion implements OnInit {
  paso: number = 1;
  mostrar: boolean = false
  tipoError:TipoError = ''                     
  servicioInversion = inject(InversionesService);
  servicioCliente= inject(ClienteService);
  ubicacion = inject(Location);
  router = inject(Router);
  formMonto = new FormGroup({
    saldo: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1000)
    ]),
  });
  formPlazo = new FormGroup({
    plazo: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1)
    ]),
  });


  constructor() {
    super();
  }

  ngOnInit(): void {
    this.suscribirseAInversion(this.servicioInversion);
  }

/*Este método antes de enviar el valor del monto comprueba que el formulario sea válido, que exista una inversión actual 
que se esté tratando y una cuenta seleccionada. Si todo está correcto extrae el saldo del valor actual del formulario, 
luego valida que ese saldo no exceda el saldo disponible en la cuenta del cliente, si esto ocurre va a asignarle a la variable 
tipoError el valor ”saldoSuperior” y sale de toda la función si no se cumple esta condición va a guardar en el saldo inicial 
de la inversión actual el valor del monto introducido por el usuario y activará la variable this.paso = 2 donde pasará a 
mostrar el formulario para seleccionar el plazo de inversión.

La última condición va a asignarle a la variable tipoError el valor ”saldoInferior” que se ejecutara en 
caso de que la inversión sea menor al valor mínimo introducido.
 */
  enviarMonto(event: Event) {
    event.preventDefault();
    if (this.formMonto.valid && this.inversionActual && this.clienteServicio.cuentaSeleccionada) {
      const { saldo } = this.formMonto.value;
      if (saldo! > this.clienteServicio.cuentaSeleccionada?.saldo) {
        this.tipoError = 'saldoSuperior'
        return
      }
      this.servicioInversionCuenta.inversionCuentaActual.saldoInicial = saldo!
      this.paso = 2;
    } else {
      this.tipoError = 'saldoInferior'
      
    }
  }

  /*Esta función primero valida que el formulario sea válido, que exista una inversión actual y que esa inversión actual 
  tenga un saldo disponible luego lo que hace es calcular el rendimiento y la tasa pasándole como argumentos las variables 
  plazo, saldo y tasa una vez el cliente haya seleccionado el plazo y cada valor resultante de estos cálculos los asignará 
  a su valor correspondiente en la inversiónActual. */
  actualizarTasaYRendimiento() {
    this.mostrar = true
    if ( this.formPlazo.valid && this.inversionActual) {
      const plazo = this.formPlazo.value.plazo!;
      const saldo = this.servicioInversionCuenta.inversionCuentaActual.saldoInicial;
      const tasa = this.servicioInversionCuenta.calcularTasa(saldo, plazo);
      this.servicioInversionCuenta.inversionCuentaActual.tasa = tasa

      this.servicioInversionCuenta.inversionCuentaActual.rendimientoAnual = this.servicioInversionCuenta.calcularRendimientoAnual(saldo,tasa,plazo)
    }
  }

  enviarPlazo(event: Event) {
    event.preventDefault();
    if (this.formPlazo.valid && this.inversionActual) {
      const { plazo } = this.formPlazo.value;
      this.servicioInversionCuenta.inversionCuentaActual.plazo = plazo!
    
      
      this.router.navigate([
        `vistaResumen/${this.servicioCliente.cuentaSeleccionada?.idCuenta}/${this.inversionActual.idInversion}`
      ]);
    } else {
      this.tipoError = 'seleccionarPlazo'
    }
  }
  
  regresar() {
    this.ubicacion.back();
  }

  cerrarError(){
    this.tipoError = ""
  }
}
