import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  ngOnInit(): void {
    const inversionesCliente = localStorage.getItem('inversionesDelCliente');
    if (inversionesCliente) {
      this.inversiones = JSON.parse(inversionesCliente)
      console.log('Inversiones listas: ', this.inversiones);
      
    }
    
    
  }
}
