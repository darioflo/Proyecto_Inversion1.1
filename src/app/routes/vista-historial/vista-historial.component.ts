import { Component, inject, OnInit, signal } from '@angular/core';
import { InversionesCuentasService } from '../../services/inversiones-cuentas.service';
import { InversionCuenta } from '../../models/Inversion_Cuenta';
import { ContenedorConsultasComponent } from "../../components/contenedor-consultas/contenedor-consultas.component";

@Component({
  selector: 'app-vista-historial',
  imports: [ContenedorConsultasComponent],
  templateUrl: './vista-historial.component.html',
  styleUrl: './vista-historial.component.css'
})
export class VistaHistorialComponent implements OnInit {
  servicioInversionCuenta = inject(InversionesCuentasService)
  historialnversiones = signal<InversionCuenta[]>([]);

  ngOnInit(): void {
    this.servicioInversionCuenta.obtenerInversionHistorial().subscribe({
      next: (data) => {
        this.historialnversiones.set(data.reverse());
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  actualizarHistorial(nuevoHistorial: InversionCuenta[]) {
    this.historialnversiones.set(nuevoHistorial);
  }
}