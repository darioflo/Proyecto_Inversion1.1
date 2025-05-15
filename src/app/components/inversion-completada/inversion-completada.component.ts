import { Component, inject, OnInit } from '@angular/core';
import { TraerInversion } from '../../core/utils/obtener-inversion-actual';
import { InversionesService } from '../../services/inversiones.service';
import { Router } from '@angular/router';
import { InversionesCuentasService } from '../../services/inversiones-cuentas.service';

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
}

irAlHome() {
  this.router.navigate(['']);
}
}
