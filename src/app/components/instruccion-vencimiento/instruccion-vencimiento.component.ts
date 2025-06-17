import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { TraerInversion } from '../../core/utils/obtener-inversion-actual';
import { InversionesService } from '../../services/inversiones.service';
import { InstruccionVencimientoService } from '../../services/instruccion-vencimiento.service';
import { ErrorComponentComponent } from "../error-component/error-component.component";
import { TipoError } from '../../models/Error';


@Component({
  selector: 'app-instruccion-vencimiento',
  imports: [ReactiveFormsModule, ErrorComponentComponent],
  templateUrl: './instruccion-vencimiento.component.html',
  styleUrl: './instruccion-vencimiento.component.css',
})
export class InstruccionVencimientoComponent extends TraerInversion implements OnInit {
  tipoError: TipoError = ''
  instruccionSeleccionada: string;
  ubicacion = inject(Location);
  inversionCuentaActual = this.servicioInversionCuenta.inversionCuentaActual
  servicioInversion = inject(InversionesService);
  clienteActual = inject(ClienteService)
  instruccionVServicio = inject(InstruccionVencimientoService)
  router = inject(Router);
  formulario = new FormGroup({
    instruccion: new FormControl<string>('', Validators.required),
  });

  constructor(){
    super()
    this.instruccionSeleccionada =''
  }

  ngOnInit(): void {
    this.suscribirseAInversion(this.servicioInversion);
  }


  elegirInstruccion(evento: Event) {
    if (this.inversionActual) {
      let opcionSeleccionada = evento.target as HTMLSelectElement;
      this.instruccionSeleccionada = opcionSeleccionada.value;
    }
  }


  guardarInversion() {
    if (this.inversionActual &&  this.inversionCuentaActual) {
      this.inversionCuentaActual.estaActiva = true
      this.inversionCuentaActual.idInversionCuenta = String(Date.now())
      this.inversionCuentaActual.cuenta.saldo = this.clienteActual.cuentaSeleccionada?.saldo ?? 0 
      this.inversionCuentaActual.cuenta.numeroCuenta = this.clienteActual.cuentaSeleccionada?.numeroCuenta ?? ''
      this.inversionCuentaActual.fechaInicio = this.servicioInversionCuenta.obtenerFechaActual()
      this.inversionCuentaActual.fechaFin = this.servicioInversionCuenta.sumarPlazoAFecha(this.inversionCuentaActual.fechaInicio,Number(this.inversionCuentaActual.plazo))
      
      this.servicioInversionCuenta.agregarInversionCuenta(this.inversionCuentaActual)
      .subscribe({
        next: (respuesta) => {
          console.log('InversiónCuenta guardada en la base de datos:', respuesta);
        },
        error: (error) => {
          console.error('Error al guardar la inversiónCuenta:', error);
        }
      });
      if (this.clienteActual.cuentaSeleccionada?.idCuenta) {
        this.servicioInversionCuenta.actualizarNuevoSaldo(this.clienteActual.cuentaSeleccionada?.idCuenta,this.clienteActual.cuentaSeleccionada?.saldo)
        .subscribe({
          next:(cuentaActualizada)=>{
            console.log('Cuenta actualizada correctamente', cuentaActualizada);
          },
          error:(error)=>{
            console.log('Error al actualizar el saldo', error);
            
          }
        })
      }
    }
  }

  finalizarCompra(evento: Event) {
    evento.preventDefault();
    if (this.formulario.valid && this.inversionActual) {
      console.log(this.formulario.valid, this.formulario.value);
      switch (this.instruccionSeleccionada) {
        case 'Reinvertir inversion-ganancia':
          /*this.instruccionVServicio.reinvertirInversionGanancia(
            this.inversionActual?.saldoInicial,
            this.inversionActual?.rendimientoAnual,
            this.inversionActual
          );*/
          if (this.clienteActual.cuentaSeleccionada) {
            this.clienteActual.cuentaSeleccionada.saldo -= this.inversionCuentaActual.saldoInicial ?? 0;
          }
          this.inversionCuentaActual.instruccionVencimiento = 'Reinvertir inversion-ganancia';
          this.guardarInversion()
          console.log("AQUÏÏÏÏ",this.inversionCuentaActual);
          
          break;
        case 'Reinvertir inversion':
          /*this.instruccionVServicio.reinvertirInversion(
            this.inversionActual.saldoInicial,
            this.inversionActual.rendimientoAnual,
            this.inversionActual
          );*/
          if (this.clienteActual.cuentaSeleccionada) {
            this.clienteActual.cuentaSeleccionada.saldo -= this.inversionCuentaActual.saldoInicial ?? 0;
          }
          this.inversionCuentaActual.instruccionVencimiento = 'Reinvertir inversion';
          this.guardarInversion()
          break;
        case 'Reembolso total':
          /*this.instruccionVServicio.reembolsarTodo(
            this.inversionActual.saldoInicial,
            this.inversionActual.rendimientoAnual,
            this.inversionActual
          );*/
          if (this.clienteActual.cuentaSeleccionada) {
            this.clienteActual.cuentaSeleccionada.saldo -= this.inversionCuentaActual.saldoInicial ?? 0;
          }
          this.inversionCuentaActual.instruccionVencimiento = 'Reembolso total';        
          this.guardarInversion()
          break;
        default:
          break;
      }
      
      this.router.navigate([
        `vistaTerminada/${this.clienteActual.cuentaSeleccionada?.idCuenta}/${this.inversionActual?.idInversion}`,
      ]);
    } else {
          this.tipoError = 'seleccionarInstruccion'

    }
  }
  regresar() {
    this.ubicacion.back();
  }

  cerrarError(){
    this.tipoError = ""
  }
}