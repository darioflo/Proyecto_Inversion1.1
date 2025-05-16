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
import { InversionesCuentasService } from '../../services/inversiones-cuentas.service';


@Component({
  selector: 'app-instruccion-vencimiento',
  imports: [ReactiveFormsModule],
  templateUrl: './instruccion-vencimiento.component.html',
  styleUrl: './instruccion-vencimiento.component.css',
})
export class InstruccionVencimientoComponent
  extends TraerInversion
  implements OnInit
{
  instruccionSeleccionada: string;
  ubicacion = inject(Location);
  servicioInversion = inject(InversionesService);
  clienteActual = inject(ClienteService)
  servicioInversionCuenta = inject(InversionesCuentasService)
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

  reinvertirInversionGanancia(saldoInvertido: number, rendimientoAnual: number) {
    if (this.inversionActual && this.clienteActual.cuentaSeleccionada) {
      this.inversionActual.saldoInicial += rendimientoAnual
      this.inversionActual.saldoAlTermino += this.clienteActual.cuentaSeleccionada.saldo;
      this.clienteActual.cuentaSeleccionada.saldo -= saldoInvertido
    }
    return 0;
  }

  reinvertirInversion(saldoInvertido: number, rendimientoAnual: number) {
    if (this.inversionActual && this.clienteActual.cuentaSeleccionada) {
      this.inversionActual.saldoInicial += saldoInvertido 
      this.inversionActual.saldoAlTermino = this.clienteActual.cuentaSeleccionada.saldo + rendimientoAnual;
      this.clienteActual.cuentaSeleccionada.saldo -= saldoInvertido
    }
    return 0;
  }

  reembolsarTodo(saldoInvertido: number, rendimientoAnual: number) {
    if (this.inversionActual && this.clienteActual.cuentaSeleccionada) {
      this.inversionActual.saldoAlTermino += saldoInvertido + rendimientoAnual + this.clienteActual.cuentaSeleccionada.saldo;
      this.clienteActual.cuentaSeleccionada.saldo -= saldoInvertido
    }
    return 0;
  }
  
  
  elegirInstruccion(evento: Event) {
    if (this.inversionActual) {
      let opcionSeleccionada = evento.target as HTMLSelectElement;
      this.instruccionSeleccionada = opcionSeleccionada.value;
    }
  }

  unificarInversionCuenta() {
    if (this.clienteActual.cuentaSeleccionada && this.inversionActual) {
      const nuevaInversionCuenta = {
        idInversionCuenta: String(Date.now()),
        idCuenta: { idCuenta: this.clienteActual.cuentaSeleccionada.idCuenta },
        idInversion: { idInversion: this.inversionActual.idInversion },
        estaActiva: true
      };
      this.servicioInversioCuenta.inversionCuentaActual = nuevaInversionCuenta;
      this.servicioInversioCuenta.inversionesCuentas.push(nuevaInversionCuenta);
      console.log(this.servicioInversioCuenta.inversionCuentaActual, this.servicioInversioCuenta.inversionesCuentas);
    } else {
      console.log('No se obtuvo la inversion');
      alert('No se obtuvo la inversion');
    }
  }

  guardarInversion() {
    if (this.inversionActual && this.clienteActual && this.servicioInversioCuenta.inversionCuentaActual) {
      const inversionesGuardadas = localStorage.getItem('inversionesDelCliente');
      const arregloInversiones = inversionesGuardadas ? JSON.parse(inversionesGuardadas) : [];
  
      const inversionCompleta = {
        nombreCliente: this.clienteActual.clienteSeleccionado?.nombre,
        apellidoCliente: this.clienteActual.clienteSeleccionado?.apellido_paterno,
        idCuentaInvertida: this.servicioInversioCuenta.inversionCuentaActual.idCuenta,
        saldo: this.clienteActual.cuentaSeleccionada?.saldo,
        idInversion: this.inversionActual.idInversion,
        descripcion: this.inversionActual.descripcion,
        instruccionVencimiento: this.inversionActual.instruccionVencimiento,
        nombre: this.inversionActual.nombre,
        plazo: this.inversionActual.plazo,
        tasa: this.inversionActual.tasa,
        saldoInicial: this.inversionActual.saldoInicial,
        saldoALTermino: this.inversionActual.saldoAlTermino,
        rendimiento: this.inversionActual.rendimiento,
        rendimientoAnual: this.inversionActual.rendimientoAnual
      };
  
      arregloInversiones.push(inversionCompleta); 
      localStorage.setItem('inversionesDelCliente', JSON.stringify(arregloInversiones))
      this.servicioInversion.inversionesDelCliente = arregloInversiones;
    }
  }

  finalizarCompra(evento: Event) {
    evento.preventDefault();
    if (this.formulario.valid && this.inversionActual) {
      console.log(this.formulario.valid, this.formulario.value);
      switch (this.instruccionSeleccionada) {
        case 'Reinvertir inversion-ganancia':
          this.reinvertirInversionGanancia(
            this.inversionActual?.saldoInicial,
            this.inversionActual?.rendimientoAnual
          );
          this.inversionActual.instruccionVencimiento = 'Reinvertir inversion-ganancia';
          this.unificarInversionCuenta()
          this.guardarInversion()
          break;
        case 'Reinvertir inversion':
          this.reinvertirInversion(
            this.inversionActual.saldoInicial,
            this.inversionActual.rendimientoAnual
          );
          this.inversionActual.instruccionVencimiento = 'Reinvertir inversion';
          this.unificarInversionCuenta()
          this.guardarInversion()
          break;
        case 'Reembolso total':
          this.reembolsarTodo(
            this.inversionActual.saldoInicial,
            this.inversionActual.rendimientoAnual
          );
          this.inversionActual.instruccionVencimiento = 'Reembolso total';
          this.unificarInversionCuenta()          
          this.guardarInversion()
          break;
        default:
          break;
      }
      
      this.router.navigate([
        `vistaTerminada/${this.clienteActual.cuentaSeleccionada?.idCuenta}/${this.inversionActual?.idInversion}`,
      ]);
    } else {
      alert(
        'Formulario inválido: Debe seleccionar una opción antes de invertir'
      );
    }
  }
  regresar() {
    this.ubicacion.back();
  }
}
