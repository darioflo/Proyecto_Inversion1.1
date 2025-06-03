import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InversionesCuentasService } from '../../services/inversiones-cuentas.service';
import { InversionCuenta } from '../../models/Inversion_Cuenta';

export type inversionCompleta  = {
        nombreCliente: string,
        apellidoCliente: string,
        idCuentaInvertida: any,
        saldo: number,
        idInversion: string,
        descripcion: string,
        instruccionVencimiento: string,
        nombre: string,
        plazo: number,
        tasa: number,
        saldoInicial: number,
        saldoALTermino: number,
        rendimientoAnual: number,
}

@Component({
  selector: 'app-consulta-inversiones',
  imports: [NgFor, NgIf,RouterLink],
  templateUrl: './consulta-inversiones.component.html',
  styleUrl: './consulta-inversiones.component.css'
})

export class ConsultaInversionesComponent implements OnInit {
  inversiones: inversionCompleta[] = [];
  servicioInversionCuenta = inject(InversionesCuentasService)
  inversionesCuentas : InversionCuenta[] = []

  ngOnInit(): void {
    this.servicioInversionCuenta.obtenerInversionesCuenta().subscribe({
      next:(data)=>{
        this.inversionesCuentas = data
      },
      error:(error)=>{
        console.log('Error :', error);
        
      }
    })
  }
}
