import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { TraerInversion } from '../../core/utils/obtener-inversion-actual';
import { InversionesService } from '../../services/inversiones.service';
import { Router } from '@angular/router';
import { InversionesCuentasService } from '../../services/inversiones-cuentas.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-seleccionar-saldo-plazo',
  imports: [ReactiveFormsModule],
  templateUrl: './seleccionar-saldo-plazo.component.html',
  styleUrl: './seleccionar-saldo-plazo.component.css'
})
export class SeleccionarSaldoPlazoComponent extends TraerInversion implements OnInit{

  formulario : FormGroup
  servicioInversion = inject(InversionesService)
  servicioInversionCuenta = inject(InversionesCuentasService)
  servicioCliente = inject(ClienteService)
  ubicacion = inject(Location)
  router = inject(Router)

  constructor(){
    super()
    this.formulario = new FormGroup({ 
      saldo: new FormControl<number | null>(1000, [
      Validators.required,
      Validators.min(1000),
    ]),
    plazo: new FormControl<number>(28, [
      Validators.required,
      Validators.min(1),
    ]),})
  }


  ngOnInit(): void {
    this.suscribirseAInversion(this.servicioInversion);
  }

  enviarSaldoPlazo(evento: Event) {
    evento.preventDefault();
    if (this.formulario.valid && this.inversionActual) {
      const { saldo, plazo } = this.formulario.value;
      this.inversionActual.saldoInicial= saldo;
      this.inversionActual.plazo = plazo!;
      if ( this.inversionActual && this.inversionActual.saldoInicial <= this.servicioCliente.cuentaSeleccionada?.saldo!) {
        
        this.inversionActual.tasa = this.servicioInversion.calcularTasa(saldo!);
        this.inversionActual.rendimiento = this.servicioInversion.calcularRendimiento(this.inversionActual.saldoInicial!,this.inversionActual.tasa);
        this.router.navigate([`vistaResumen/${this.servicioCliente.cuentaSeleccionada?.idCuenta}/${this.inversionActual.idInversion}`,]);

        console.log('Datos formulario:', this.formulario.value);
        console.log('Inversion actual:', this.inversionActual);
      } 
      else {
        window.alert(
          'Formulario inválido: No se puede enviar una cantidad superior al saldo.'
        );
      }
    } else {
      console.log('Formulario inválido');
      window.alert(
        'Formulario inválido: El monto mínimo para invertir es de 1000 mxn'
      );
    }
  }
  regresar(){
    this.ubicacion.back()
  }

}
