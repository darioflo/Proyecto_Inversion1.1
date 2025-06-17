import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ObtenerClienteAutenticado } from '../../core/utils/obtener-cliente-autenticado';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-seleccionar-inversion',
  imports: [RouterLink, NgFor],
  templateUrl: './seleccionar-inversion.component.html',
  styleUrl: './seleccionar-inversion.component.css'
})
export class SeleccionarInversionComponent extends ObtenerClienteAutenticado implements OnInit {

  servicioCliente = inject(ClienteService)
  
    ngOnInit(): void {
      this.mostrarInversiones()
      this.idCuentaSeleccionada
      console.log('Inversiones disponibles :',this.servicioInversiones.inversionesDisponibles);
}
}
