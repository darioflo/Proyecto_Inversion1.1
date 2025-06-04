import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InversionesCuentasService } from '../../services/inversiones-cuentas.service';
import { InversionCuenta } from '../../models/Inversion_Cuenta';
import { log } from 'console';


@Component({
  selector: 'app-consulta-inversiones',
  imports: [NgFor, NgIf,RouterLink],
  templateUrl: './consulta-inversiones.component.html',
  styleUrl: './consulta-inversiones.component.css'
})

export class ConsultaInversionesComponent implements OnInit {
  inversiones: InversionCuenta[] = [];
  servicioInversionCuenta = inject(InversionesCuentasService)
  inversionesCuentas : InversionCuenta[] = []
  paso: number = 0
  idInversionCuenta! : string
  inversionAlHistorial! : InversionCuenta

  ngOnInit(): void {
    this.servicioInversionCuenta.obtenerInversionesCuenta().subscribe({
      next:(data)=>{
        this.inversionesCuentas = data.reverse()
      },
      error:(error)=>{
        console.log('Error :', error);
        
      }
    })
  }

  cancelarInversion(idInversionCuenta: string, inversionCuenta : InversionCuenta) {
    console.log('Cancelar inversión:', idInversionCuenta);
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
              this.inversionesCuentas = data.reverse();
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
