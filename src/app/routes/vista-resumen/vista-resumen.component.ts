import { Component, OnInit } from '@angular/core';
import { DetallesInversionComponent } from "../../components/detalles-inversion/detalles-inversion.component";
import { ParametrosDeVista } from '../../core/utils/obtener-parametro-ruta';

@Component({
  selector: 'app-vista-resumen',
  imports: [DetallesInversionComponent],
  templateUrl: './vista-resumen.component.html',
  styleUrl: './vista-resumen.component.css'
})
export class VistaResumenComponent extends ParametrosDeVista implements OnInit {
  ngOnInit(): void {
    this.obtenerIDPagina();
  }
}

