import { Component, inject, OnInit } from '@angular/core';
import { TraerInversion } from '../../core/utils/obtener-inversion-actual';
import { InversionesService } from '../../services/inversiones.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-detalles-inversion',
  imports: [],
  templateUrl: './detalles-inversion.component.html',
  styleUrl: './detalles-inversion.component.css'
})
export class DetallesInversionComponent extends TraerInversion implements OnInit{

  servicioInversion = inject(InversionesService)
  servicioCLiente = inject(ClienteService)
  ubicacion = inject(Location)
  router = inject(Router)

ngOnInit(): void {
  this.suscribirseAInversion(this.servicioInversion)  
}

regresar() {
  this.ubicacion.back();
}
continuar() {
  this.router.navigate([
    `/vistaInstruccion/${this.servicioCLiente.cuentaSeleccionada?.idCuenta}/${this.inversionActual?.idInversion}`,
  ]);
}
}
