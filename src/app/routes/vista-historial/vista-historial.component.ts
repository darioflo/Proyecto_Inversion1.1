import { Component, inject, OnInit } from '@angular/core';
import { InversionesCuentasService } from '../../services/inversiones-cuentas.service';
import { InversionCuenta } from '../../models/Inversion_Cuenta';
import { ContenedorConsultasComponent } from "../../components/contenedor-consultas/contenedor-consultas.component";

@Component({
  selector: 'app-vista-historial',
  imports: [ContenedorConsultasComponent],
  templateUrl: './vista-historial.component.html',
  styleUrl: './vista-historial.component.css'
})
export class VistaHistorialComponent implements OnInit{

  servicioInversionCuenta = inject(InversionesCuentasService)
  historialnversiones! : any

  ngOnInit(): void {
    this.servicioInversionCuenta.obtenerInversionHistorial().subscribe({
      next:(data)=>{
        this.historialnversiones = data.reverse()
        console.log(this.historialnversiones);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
