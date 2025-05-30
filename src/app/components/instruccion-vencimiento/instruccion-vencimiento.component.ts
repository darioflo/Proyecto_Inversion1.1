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

/*Esta función la va a desencadenar el método onChange() del select y lo que hará es evaluar si existe la inversiónActual 
y una vez comprobado esto guardará en la variable opcionSeleccionada el elemento que desencadenó el evento y guarda el valor 
del elemento seleccionado por el usuario en la variable instruccionSeleccionada. */
  elegirInstruccion(evento: Event) {
    if (this.inversionActual) {
      let opcionSeleccionada = evento.target as HTMLSelectElement;
      this.instruccionSeleccionada = opcionSeleccionada.value;
    }
  }

/*Esta función verifica que existan los datos necesarios de la inversión, el cliente y la cuenta de inversión actual. Si es 
así, recupera del localStorage las inversiones previamente guardadas (o crea un arreglo vacío si no hay ninguna), construye 
un objeto con toda la información relevante de la inversión actual (como nombre del cliente, cuenta, saldo, plazo, tasa, etc.) 
y lo agrega al arreglo arregloInversiones. Finalmente, actualiza el localStorage con el nuevo arreglo y también actualiza la 
propiedad inversionesDelCliente del servicio correspondiente, asegurando que la inversión recién realizada quede registrada y 
disponible tanto en memoria como en almacenamiento persistente. */
  guardarInversion() {
    if (this.inversionActual &&  this.inversionCuentaActual) {
      this.inversionCuentaActual.estaActiva = true
      this.inversionCuentaActual.idInversionCuenta = String(Date.now())
      this.inversionCuentaActual.idCuenta.idCuenta = this.idCuentaSeleccionada ?? 'no cogió'
      this.inversionCuentaActual.idInversion.idInversion = this.inversionActual.idInversion ?? 'no cogió'
      
      this.servicioInversionCuenta.agregarInversionCuenta(this.inversionCuentaActual)
      .subscribe({
        next: (respuesta) => {
          console.log('InversiónCuenta guardada en la base de datos:', respuesta);
        },
        error: (error) => {
          console.error('Error al guardar la inversiónCuenta:', error);
        }
      });
      if (this.clienteActual.cuentaSeleccionada?.id) {
        this.servicioInversionCuenta.actualizarNuevoSaldo(this.clienteActual.cuentaSeleccionada?.id,this.clienteActual.cuentaSeleccionada?.saldo)
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

/*Esta función comprueba el estado del formulario y la existencia de la inversionActual y luego en un switch-case comprobará 
el valor de la variable instruccionSeleccionada que siempre será una de las instrucciones previamente determinadas 
(el código comentado es el que aplica los cálculos correspondientes a la elección de cada instrucción de vencimiento) 
luego comprueba la existencia de la cuentaSeleccionada y resta al saldo de la cuenta el saldo inicial de la inversión le 
asigna al atributo instruccionVencimiento de la inversionActual el valor de la instrucción seleccionada y ejecuta las 
funciones unificarInversionCuenta() y guardarInversion(). Finalmente nos envía a la página donde veremos el resumen de la compra.*/
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
        `vistaTerminada/${this.clienteActual.cuentaSeleccionada?.id}/${this.inversionActual?.idInversion}`,
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