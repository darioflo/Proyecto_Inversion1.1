import { inject } from '@angular/core';
import { InversionesService } from '../../services/inversiones.service';
import { ClienteService } from '../../services/cliente.service';
import { InversionesCuentasService } from '../../services/inversiones-cuentas.service';
import { Cuenta } from '../../models/Cuenta';
import { InversionCuenta } from '../../models/Inversion_Cuenta';


export class ObtenerClienteAutenticado {
  cuentasDeCliente: Cuenta[] | null = null;
  servicioInversiones = inject(InversionesService);
  clienteServicio = inject(ClienteService);
  servicioInversioCuenta = inject(InversionesCuentasService)
  inversionCuentaActual = this.servicioInversioCuenta.inversionCuentaActual
  idCuentaSeleccionada =  this.clienteServicio.cuentaSeleccionada?.id



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

obtenerCuentas(){
    this.clienteServicio.obtenerCuentas().subscribe({
      next:(cuentas)=>{
        this.cuentasDeCliente = cuentas
        console.log(this.cuentasDeCliente);
        if (typeof localStorage !== 'undefined') {
          let actualizarCuenta = localStorage.getItem('inversionesDelCliente');
          if (actualizarCuenta) {
            let inversionHecha = JSON.parse(actualizarCuenta);
            inversionHecha.forEach((inversion: InversionCuenta) => {
              this.cuentasDeCliente?.forEach((cuenta)=>{
                if (inversion.cuenta.id === cuenta.id) {
                    cuenta.saldo = Math.min(cuenta.saldo, inversion.saldoInicial);
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


  obtenerCuentaActual(id: string) {
      this.clienteServicio.cuentaSeleccionada = (this.cuentasDeCliente?.find((cuenta) => cuenta.id === id)) ?? null;
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
          const inversionesGuardadas: InversionCuenta[] = JSON.parse(inversionesPosibles);
  
        const idsInversionesDeCuenta = inversionesGuardadas
            .filter(inv => inv.cuenta.id === this.clienteServicio.cuentaSeleccionada?.id)
            .map(inv => inv.inversion);
          this.servicioInversiones.inversionesDisponibles = this.servicioInversiones.inversionesDisponibles.filter(
            inv => !idsInversionesDeCuenta.includes(inv)
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
