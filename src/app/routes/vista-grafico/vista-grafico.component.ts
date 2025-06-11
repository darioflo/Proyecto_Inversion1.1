import { Component, inject, OnInit } from '@angular/core';
import { InversionesCuentasService } from '../../services/inversiones-cuentas.service';
import { NgFor, NgIf } from '@angular/common';
import { GraficoCrecimientoComponent } from "../../components/grafico-inversion/grafico-inversion.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-vista-grafico',
  imports: [NgFor, GraficoCrecimientoComponent,NgIf,RouterLink],
  templateUrl: './vista-grafico.component.html',
  styleUrl: './vista-grafico.component.css'
})
export class VistaGraficoComponent implements OnInit {
  inversiones : any[] = []
  servicioInversionCuenta = inject(InversionesCuentasService)

  ngOnInit(): void {
    this.servicioInversionCuenta.obtenerInversionesCuenta().subscribe({
      next: (data) => {
        this.inversiones = data.reverse();
        console.log(this.inversiones);
        
      },
      error: (error) => {
        console.log('Error :', error);
      }
    })
  }
}
