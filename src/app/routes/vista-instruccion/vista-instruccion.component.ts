import { Component, OnInit } from '@angular/core';
import { InstruccionVencimientoComponent } from "../../components/instruccion-vencimiento/instruccion-vencimiento.component";
import { ParametrosDeVista } from '../../core/utils/obtener-parametro-ruta';

@Component({
  selector: 'app-vista-instruccion',
  imports: [InstruccionVencimientoComponent],
  templateUrl: './vista-instruccion.component.html',
  styleUrl: './vista-instruccion.component.css'
})
export class VistaInstruccionComponent extends ParametrosDeVista
implements OnInit
{
ngOnInit(): void {
  this.obtenerIDPagina();
}
}