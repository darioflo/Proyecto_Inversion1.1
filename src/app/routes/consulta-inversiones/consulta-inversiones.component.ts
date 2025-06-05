import { Component, inject, OnInit, signal } from '@angular/core';
import { InversionesCuentasService } from '../../services/inversiones-cuentas.service';
import { InversionCuenta } from '../../models/Inversion_Cuenta';
import { ContenedorConsultasComponent } from "../../components/contenedor-consultas/contenedor-consultas.component";

@Component({
  selector: 'app-consulta-inversiones',
  imports: [ContenedorConsultasComponent],
  templateUrl: './consulta-inversiones.component.html',
  styleUrl: './consulta-inversiones.component.css'
})
export class ConsultaInversionesComponent implements OnInit  {

  servicioInversionCuenta = inject(InversionesCuentasService)
  inversiones = signal<InversionCuenta[]>([]);

  ngOnInit(): void {
    this.servicioInversionCuenta.obtenerInversionesCuenta().subscribe({
      next: (data) => {
        this.inversiones.set(data.reverse());
      },
      error: (error) => {
        console.log('Error :', error);
      }
    })
  }

  actualizarInversiones(nuevasInversiones: InversionCuenta[]) {
    this.inversiones.set(nuevasInversiones);
  }
}