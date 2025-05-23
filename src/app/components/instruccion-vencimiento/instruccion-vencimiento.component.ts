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
import { InstruccionVencimientoService } from '../../services/instruccion-vencimiento.service';
import { ErrorComponentComponent } from "../error-component/error-component.component";
import { TipoError } from '../../models/Error';


@Component({
  selector: 'app-instruccion-vencimiento',
  imports: [ReactiveFormsModule, ErrorComponentComponent],
  templateUrl: './instruccion-vencimiento.component.html',
  styleUrl: './instruccion-vencimiento.component.css',
})
export class InstruccionVencimientoComponent
  extends TraerInversion
  implements OnInit
{
  tipoError: TipoError = ''
  instruccionSeleccionada: string;
  ubicacion = inject(Location);
  servicioInversion = inject(InversionesService);
  clienteActual = inject(ClienteService)
  servicioInversionCuenta = inject(InversionesCuentasService)
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

  
/*Lo primero que hace esta función es comprobar la existencia de la cuentaSeleccionada y la inversionActual, si ambos 
existen pues va a crear la variable nuevaInversionCuenta y guarda como id de la nueva inversión el momento exacto en 
que se crea utilizando el Date.now() luego guarda en su propiedad idCuenta el valor del id de la cuenta seleccionada y 
en su propiedad idInversion el valor del id de la inversión actual, pone en true el valor de la propiedad estaActiva, 
luego a la variable inversionCuentaActual del servicio servicioInversionCuenta le asigna la variable nuevaInversionCuenta 
y luego agrega al arreglo inversionesCuentas esta última inversión creada. */
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


/*Esta función verifica que existan los datos necesarios de la inversión, el cliente y la cuenta de inversión actual. Si es 
así, recupera del localStorage las inversiones previamente guardadas (o crea un arreglo vacío si no hay ninguna), construye 
un objeto con toda la información relevante de la inversión actual (como nombre del cliente, cuenta, saldo, plazo, tasa, etc.) 
y lo agrega al arreglo arregloInversiones. Finalmente, actualiza el localStorage con el nuevo arreglo y también actualiza la 
propiedad inversionesDelCliente del servicio correspondiente, asegurando que la inversión recién realizada quede registrada y 
disponible tanto en memoria como en almacenamiento persistente. */
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
        rendimientoAnual: this.inversionActual.rendimientoAnual
      };
  
      arregloInversiones.push(inversionCompleta); 
      localStorage.setItem('inversionesDelCliente', JSON.stringify(arregloInversiones))
      this.servicioInversion.inversionesDelCliente = arregloInversiones;
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
            this.clienteActual.cuentaSeleccionada.saldo -= this.inversionActual.saldoInicial;
          }
          this.inversionActual.instruccionVencimiento = 'Reinvertir inversion-ganancia';
          this.unificarInversionCuenta()
          this.guardarInversion()
          break;
        case 'Reinvertir inversion':
          /*this.instruccionVServicio.reinvertirInversion(
            this.inversionActual.saldoInicial,
            this.inversionActual.rendimientoAnual,
            this.inversionActual
          );*/
          if (this.clienteActual.cuentaSeleccionada) {
            this.clienteActual.cuentaSeleccionada.saldo -= this.inversionActual.saldoInicial;
          }
          this.inversionActual.instruccionVencimiento = 'Reinvertir inversion';
          this.unificarInversionCuenta()
          this.guardarInversion()
          break;
        case 'Reembolso total':
          /*this.instruccionVServicio.reembolsarTodo(
            this.inversionActual.saldoInicial,
            this.inversionActual.rendimientoAnual,
            this.inversionActual
          );*/
          if (this.clienteActual.cuentaSeleccionada) {
            this.clienteActual.cuentaSeleccionada.saldo -= this.inversionActual.saldoInicial;
          }
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
