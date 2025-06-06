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

  mostrarInversiones() {
    this.servicioInversiones.obtenerInversiones().subscribe({
      next: (inversiones) => {
          this.servicioInversioCuenta.obtenerInversionesCuenta().subscribe({
            next:(inversionesRealizadas)=>{
              const inversionesDeEstaCuenta = inversionesRealizadas.filter(inversion => this.idCuentaSeleccionada === inversion.cuenta.id)
              const idInversionesRealizadas = inversionesDeEstaCuenta.map(inversion=> inversion.inversion.idInversion)
              this.servicioInversiones.inversionesDisponibles = inversiones.filter(inversion=>
                !idInversionesRealizadas.includes(inversion.idInversion)
              )
              
            },
            error:(error)=>{
              console.log(error);
            }
          })
      },
      error: (error) => {
        console.log('Error', error);
        alert(`Error: ${error}`);
      },
    });
  }

  
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
