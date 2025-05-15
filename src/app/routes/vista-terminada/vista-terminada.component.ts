import { Component, OnInit } from '@angular/core';
import { InversionCpmpletadaComponent } from "../../components/inversion-completada/inversion-completada.component";
import { ParametrosDeVista } from '../../core/utils/obtener-parametro-ruta';

@Component({
  selector: 'app-vista-terminada',
  imports: [InversionCpmpletadaComponent],
  templateUrl: './vista-terminada.component.html',
  styleUrl: './vista-terminada.component.css'
})
export class VistaTerminadaComponent extends ParametrosDeVista
implements OnInit
{
ngOnInit(): void {
  this.obtenerIDPagina();
}
}
