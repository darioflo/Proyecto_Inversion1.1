import { Component, inject, OnInit } from '@angular/core';
import { inversionCompleta } from '../consulta-inversiones/consulta-inversiones.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { EditarInversionCommand } from '../../core/utils/Command';
import { InversionesService } from '../../services/inversiones.service';
import { ErrorComponentComponent } from "../../components/error-component/error-component.component";
import { TipoError } from '../../models/Error';

@Component({
  selector: 'app-actualizar-inversion',
  imports: [NgFor, NgIf, FormsModule, ErrorComponentComponent],
  templateUrl: './actualizar-inversion.component.html',
  styleUrl: './actualizar-inversion.component.css'
})
export class ActualizarInversionComponent implements OnInit{

  indiceSeleccionado! : number | null
  inversionesDelCliente!: inversionCompleta[] | null
  inversionesServicio = inject(InversionesService)
  tipoError: TipoError = ''

    ngOnInit(): void {
      let inversiones = localStorage.getItem('inversionesDelCliente')
        if (inversiones) {
          this.inversionesDelCliente = JSON.parse(inversiones)
          console.log('Inversiones editables: ',this.inversionesDelCliente);
        }
      }
    mostrarCampos(i: number): void {
      this.indiceSeleccionado = this.indiceSeleccionado === i ? null : i;
    }
    guardarCambios(i:number){
      if (this.inversionesDelCliente) {
        const inversion = this.inversionesDelCliente[i];

        const commandoEditar = new EditarInversionCommand(
          this.inversionesDelCliente,
          i,
          inversion.saldoInicial,
          inversion.plazo,
          inversion.instruccionVencimiento,
          this.inversionesServicio,
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
