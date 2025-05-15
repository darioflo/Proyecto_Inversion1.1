import { Component, OnInit } from '@angular/core';
import { SeleccionarSaldoPlazoComponent } from "../../components/seleccionar-saldo-plazo/seleccionar-saldo-plazo.component";
import { ParametrosDeVista } from '../../core/utils/obtener-parametro-ruta';

@Component({
  selector: 'app-vista-seleccion',
  imports: [SeleccionarSaldoPlazoComponent],
  templateUrl: './vista-seleccion.component.html',
  styleUrl: './vista-seleccion.component.css'
})
export class VistaSeleccionComponent extends ParametrosDeVista
implements OnInit
{
ngOnInit(): void {
  this.obtenerIDPagina();
}
}

