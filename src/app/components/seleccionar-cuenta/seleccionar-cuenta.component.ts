import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ObtenerClienteAutenticado } from '../../core/utils/obtener-cliente-autenticado';
import { NgFor } from '@angular/common';
import { inversionCompleta } from '../../routes/consulta-inversiones/consulta-inversiones.component';

@Component({
  selector: 'app-seleccionar-cuenta',
  imports: [RouterLink, NgFor],
  templateUrl: './seleccionar-cuenta.component.html',
  styleUrl: './seleccionar-cuenta.component.css'
})
export class SeleccionarCuentaComponent extends ObtenerClienteAutenticado
implements OnInit{

  ngOnInit(): void {
    if (!this.clienteServicio.clienteSeleccionado) {
      this.obtenerClienteAutenticado();
    }
    this.obtenerCuentas();
  }
}