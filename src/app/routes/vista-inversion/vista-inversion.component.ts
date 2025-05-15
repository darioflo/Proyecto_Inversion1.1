import { Component, OnInit } from '@angular/core';
import { SeleccionarInversionComponent } from "../../components/seleccionar-inversion/seleccionar-inversion.component";
import { ParametrosDeVista } from '../../core/utils/obtener-parametro-ruta';

@Component({
  selector: 'app-vista-inversion',
  imports: [SeleccionarInversionComponent],
  templateUrl: './vista-inversion.component.html',
  styleUrl: './vista-inversion.component.css'
})
export class VistaInversionComponent extends ParametrosDeVista
implements OnInit
{
ngOnInit(): void {
  this.obtenerIDPagina();
}
}