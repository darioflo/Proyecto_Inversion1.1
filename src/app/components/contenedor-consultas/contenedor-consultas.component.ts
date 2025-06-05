import { NgFor, NgIf } from '@angular/common';
import { Component, inject, input, output,} from '@angular/core';
import { RouterLink } from '@angular/router';
import { InversionesCuentasService } from '../../services/inversiones-cuentas.service';
import { InversionCuenta } from '../../models/Inversion_Cuenta';

@Component({
  selector: 'app-contenedor-consultas',
  imports: [NgFor, NgIf,RouterLink],
  templateUrl: './contenedor-consultas.component.html',
  styleUrl: './contenedor-consultas.component.css'
})
export class ContenedorConsultasComponent {
  inversiones = input<InversionCuenta[]>([])
  servicioInversionCuenta = inject(InversionesCuentasService)
  inversionesCuentas = output<InversionCuenta[]>()
  paso: number = 0
  idInversionCuenta! : string
  inversionAlHistorial! : InversionCuenta
  titulo = input<string>("Consulta")

  cancelarInversion(idInversionCuenta: string, inversionCuenta : InversionCuenta) {
    this.paso = 1
    this.idInversionCuenta = idInversionCuenta
    this.inversionAlHistorial = inversionCuenta
    console.log(this.paso, this.idInversionCuenta, this.inversionAlHistorial);
  }

  confirmarEliminacion(){
    this.paso = 2
    console.log(this.paso);
    this.servicioInversionCuenta.eliminarInversionCuenta(this.idInversionCuenta).subscribe({
      next:()=>{
          console.log('Inversion eliminada correctamente :)');
          this.servicioInversionCuenta.obtenerInversionesCuenta().subscribe({
            next: (data) => {
              this.inversionesCuentas.emit(data.reverse());
              this.paso = 0;
            },
            error: (error) => {
              console.log('Error al recargar:', error);
            }
          });
      },
      error:(error)=>{
        console.log(":(", error);
        
      },
    })
    this.servicioInversionCuenta.agregarInversionAlHistorial(this.inversionAlHistorial).subscribe({
      next:()=>{
        console.log("Inversión agregada al historial: ", this.inversionAlHistorial);
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }
}
