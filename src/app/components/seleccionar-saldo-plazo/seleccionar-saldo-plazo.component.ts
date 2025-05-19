import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location, NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { TraerInversion } from '../../core/utils/obtener-inversion-actual';
import { InversionesService } from '../../services/inversiones.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-seleccionar-saldo-plazo',
  standalone: true,                     // ↓ CAMBIO: Convertimos el componente a standalone
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './seleccionar-saldo-plazo.component.html',
  styleUrls: ['./seleccionar-saldo-plazo.component.css']
})
export class SeleccionarSaldoPlazoComponent extends TraerInversion implements OnInit {
  paso = 1;                         
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
  enviarMonto(event: Event) {

    event.preventDefault();
    if (this.formMonto.valid && this.inversionActual && this.clienteServicio.cuentaSeleccionada) {
      const { saldo } = this.formMonto.value;

      if (saldo! > this.clienteServicio.cuentaSeleccionada?.saldo) {
        alert('El monto de inversión no puede ser mayor a su saldo en cuenta :(')
        return
      }
      
      this.inversionActual.saldoInicial = saldo!;
      this.paso = 2;
    } else {
      alert('El monto mínimo para invertir es de 1000 MXN');
    }
  }

  actualizarTasaYRendimiento() {
    if ( this.formPlazo.valid && this.inversionActual && this.inversionActual.saldoInicial ) {
      const plazo = this.formPlazo.value.plazo!;
      const saldo = this.inversionActual.saldoInicial;
      const tasa = this.servicioInversion.calcularTasa(saldo, plazo);
      this.inversionActual.tasa = tasa;
      this.inversionActual.rendimientoAnual = this.servicioInversion.calcularRendimientoAnual(saldo,tasa,plazo)
    }
  }

  enviarPlazo(event: Event) {
    event.preventDefault();
    if (this.formPlazo.valid && this.inversionActual) {
      const { plazo } = this.formPlazo.value;
      this.inversionActual.plazo = plazo!;
      this.router.navigate([
        `vistaResumen/${this.servicioCliente.cuentaSeleccionada?.idCuenta}/${this.inversionActual.idInversion}`
      ]);
    } else {
      alert('Selecciona un plazo válido para continuar');
    }
  }

  regresar() {
    this.ubicacion.back();
  }
}
