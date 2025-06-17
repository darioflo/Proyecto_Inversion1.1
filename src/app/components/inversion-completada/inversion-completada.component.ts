import { Component, inject, OnInit } from '@angular/core';
import { TraerInversion } from '../../core/utils/obtener-inversion-actual';
import { InversionesService } from '../../services/inversiones.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inversion-completada',
  imports: [],
  templateUrl: './inversion-completada.component.html',
  styleUrl: './inversion-completada.component.css'
})
export class InversionCpmpletadaComponent extends TraerInversion
implements OnInit
{
servicioInversion = inject(InversionesService);
router = inject(Router);

ngOnInit(): void {
  this.suscribirseAInversion(this.servicioInversion);
  console.log(this.inversionActual);
  console.log(this.servicioInversionCuenta.inversionCuentaActual);
  
}

irAlHome() {
  this.router.navigate(['/home']);
}
}
