import { Component, inject, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { EditarInversionCommand } from '../../core/utils/Command';
import { ErrorComponentComponent } from "../../components/error-component/error-component.component";
import { TipoError } from '../../models/Error';
import { Router } from '@angular/router';
import { InversionesCuentasService } from '../../services/inversiones-cuentas.service';
import { InversionCuenta } from '../../models/Inversion_Cuenta';

@Component({
  selector: 'app-actualizar-inversion',
  imports: [NgFor, NgIf, FormsModule, ErrorComponentComponent],
  templateUrl: './actualizar-inversion.component.html',
  styleUrl: './actualizar-inversion.component.css'
})
export class ActualizarInversionComponent implements OnInit{

  indiceSeleccionado! : number | null
  inversionesDelCliente = signal<InversionCuenta[]>([])
  servicioInversionCuenta = inject(InversionesCuentasService)
  tipoError: TipoError = ''
  router = inject(Router)

    ngOnInit(): void {
        this.servicioInversionCuenta.obtenerInversionesCuenta().subscribe({
          next:(data)=>{
            this.inversionesDelCliente.set(data.reverse())
          },
          error:(error)=>{
            console.log(error);
            
          }
        })
      }
    
      mostrarCampos(i: number): void {
      this.indiceSeleccionado = this.indiceSeleccionado === i ? null : i;
    }
    
    guardarCambios(i:number){
      if (this.inversionesDelCliente) {
        const inversion = this.inversionesDelCliente()[i];

        const commandoEditar = new EditarInversionCommand(
          this.inversionesDelCliente(),
          i,
          inversion.saldoInicial,
          inversion.plazo,
          inversion.instruccionVencimiento,
          this.servicioInversionCuenta,
          (error: TipoError) => {this.tipoError = error}
        );
      
          commandoEditar.editar();
          this.indiceSeleccionado = null;
      }
    }

    cerrarError(){
      this.tipoError = ''
    }
}
