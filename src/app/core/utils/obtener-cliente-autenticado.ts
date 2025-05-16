import { inject } from '@angular/core';
import { Inversion } from '../../models/Inversion';
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
        if (typeof localStorage !== 'undefined') {
          let actualizarCuenta = localStorage.getItem('inversionesDelCliente');
          if (actualizarCuenta) {
            let inversionHecha = JSON.parse(actualizarCuenta);
            inversionHecha.forEach((inversion: inversionCompleta) => {
              this.cuentasDeCliente?.forEach((cuenta)=>{
                if (inversion.idCuentaInvertida.idCuenta === cuenta.idCuenta) {
                  if (inversion.idCuentaInvertida.idCuenta === cuenta.idCuenta) {
                    cuenta.saldo = Math.min(cuenta.saldo, inversion.saldo);
                  }
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

  obtenerCuentaActual(idCuenta: string) {
      this.clienteServicio.cuentaSeleccionada = (this.cuentasDeCliente?.find((cuenta) => cuenta.idCuenta === idCuenta)) ?? null;
  }

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
