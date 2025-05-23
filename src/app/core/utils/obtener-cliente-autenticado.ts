import { inject } from '@angular/core';
import { InversionesService } from '../../services/inversiones.service';
import { ClienteService } from '../../services/cliente.service';
import { InversionesCuentasService } from '../../services/inversiones-cuentas.service';
import { Cuenta } from '../../models/Cuenta';
import { inversionCompleta } from '../../routes/consulta-inversiones/consulta-inversiones.component';

export class ObtenerClienteAutenticado {
  cuentasDeCliente: Cuenta[] | null = null;
  servicioInversiones = inject(InversionesService);
  clienteServicio = inject(ClienteService);
  servicioInversioCuenta = inject(InversionesCuentasService)
  inversionCuentaActual = this.servicioInversioCuenta.inversionCuentaActual
  idCuentaSeleccionada =  this.clienteServicio.cuentaSeleccionada?.idCuenta


/*Esta función se suscribe al método obtenerCliente() del servicio clienteServicio una vez que la función se ejecuta 
correctamente guarda en la variable clienteSeleccionado del servicio clienteServicio el primer cliente que trae la respuesta 
del Observable.
Este método asume que ya existe un único cliente autenticado por eso siempre trae un único cliente… Más adelante este 
deberá ser sustituido por un método de autenticación.
*/
obtenerClienteAutenticado() {
    this.clienteServicio.obtenerClientes().subscribe({
      next: (cliente) => {
        this.clienteServicio.clienteSeleccionado = cliente[0];
        console.log(
          'Cliente en sesion: ',
          this.clienteServicio.clienteSeleccionado
        );
      },
      error: (error) => {
        console.log(error);
        alert(`Error: ${error}`);
      },
    });
  }



/*Esta función se suscribe al método obtenerCuentas() del servicio clienteServicio y lo primero que hace es asignarle el valor 
que trae la función a la variable this.CuentasDeCliente, luego verifica que esté disponible el localStorage y guarda en 
la variable actualizarCuenta el atributo con nombre ‘inversionesDelCLiente’ y si hay elementos dentro de esta convierte a 
arreglo JS los elementos guardados en actualizarCuenta y los asigna a la variable inversionHecha y le pasamos la callback 
.forEach() y también aplicará lo mismo la variable this.CuentasDeCliente para luego comparar el id de cada una de esas cuentas
con el id de cuenta de cada inversión y cuando coincidan ambos elementos le asignará al saldo de la cuenta en cuestión 
el valor mínimo existente entre el saldo de la inversión y el saldo de la cuenta seleccionada. */
obtenerCuentas(){
    this.clienteServicio.obtenerCuentas().subscribe({
      next:(cuentas)=>{
        this.cuentasDeCliente = cuentas
        if (typeof localStorage !== 'undefined') {
          let actualizarCuenta = localStorage.getItem('inversionesDelCliente');
          if (actualizarCuenta) {
            let inversionHecha = JSON.parse(actualizarCuenta);
            inversionHecha.forEach((inversion: inversionCompleta) => {
              this.cuentasDeCliente?.forEach((cuenta)=>{
                if (inversion.idCuentaInvertida.idCuenta === cuenta.idCuenta) {
                    cuenta.saldo = Math.min(cuenta.saldo, inversion.saldo);
                }
              })
            }
          )}
        }  
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }


/*Este método va a seleccionar la cuenta con la cual el cliente va a completar las inversiones y lo que hace es asignarle a la variable cuentaSeleccionada
del servicio clienteServicio el resultado de la callback .find() cuya funcion es descubrir si el id de la cuenta seleccionda por el cliente coincide con alguno
de los ids de las cuentas que tiene a su cargo*/

  obtenerCuentaActual(idCuenta: string) {
      this.clienteServicio.cuentaSeleccionada = (this.cuentasDeCliente?.find((cuenta) => cuenta.idCuenta === idCuenta)) ?? null;
  }


/*Este método se suscribe al método obtenerInversiones() del servicio servicioInversiones y una vez se ejecute correctamente la petición le asigna 
a la variable inversionesDisponibles del servicio servicioInversiones. Luego guarda en la variable inversionesPosibles el valor del elemento 
“inversionesDelCliente”, y si hay elementos dentro de esa variable va a parsearlos y convertirlos en un arreglo JS guardados en la variable i
nversionesGuardadas. El siguiente paso será guardar en el arreglo idsInversionesDeCuenta el resultado de primeramente filtrar el id de la cuenta 
de las inversiones y el id de la cuenta seleccionada por el cliente, para luego mapearlas y dejarlas solo en el id de las que coincidan. Y convertirá 
las inversiones disponibles en un arreglo donde solo se encuentren las inversiones que no esten en la cuenta seleccionada por el cliente. */
  mostrarInversiones() {
    this.servicioInversiones.obtenerInversiones().subscribe({
      next: (inversiones) => {
        this.servicioInversiones.inversionesDisponibles = inversiones;
        const inversionesPosibles = localStorage.getItem('inversionesDelCliente');
        if (inversionesPosibles) {
          const inversionesGuardadas: inversionCompleta[] = JSON.parse(inversionesPosibles);
  
        const idsInversionesDeCuenta = inversionesGuardadas
            .filter(inv => inv.idCuentaInvertida.idCuenta === this.clienteServicio.cuentaSeleccionada?.idCuenta)
            .map(inv => inv.idInversion);
          this.servicioInversiones.inversionesDisponibles = this.servicioInversiones.inversionesDisponibles.filter(
            inv => !idsInversionesDeCuenta.includes(inv.idInversion)
          );
          console.log('Inversiones disponibles filtradas:', this.servicioInversiones.inversionesDisponibles);
        }
      },
      error: (error) => {
        console.log('Error', error);
        alert(`Error: ${error}`);
      },
    });
  }
/*
Este método se activará una vez el cliente haya hecho click en uno de los contenedores de las inversiones, tomará el id de la inversión seleccionada y luego de volver 
obtener las inversiones utilizará la callback .find() para encontrar el id de la inversión que coincida con el id pasado como argumento que será el seleccionado 
por el usuario */
  obtenerInversionActual(idInversion: string) {
    this.servicioInversiones.obtenerInversiones().subscribe({
      next: (inversiones) => {
        const inversion = inversiones.find(
          (inv) => inv.idInversion === idInversion
        );
        this.servicioInversiones.actualizarInversionActual(inversion!);
        console.log('Inversión Actual:', inversion);
      },
      error: (error) => {
        console.error('Error al obtener inversiones:', error);
        alert(`Error: ${error}`);
      },
    });
  };
  }
