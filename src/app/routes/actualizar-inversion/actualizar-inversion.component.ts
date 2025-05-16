import { Component, inject, OnInit } from '@angular/core';
import { inversionCompleta } from '../consulta-inversiones/consulta-inversiones.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { EditarInversionCommand } from '../../core/utils/Command';
import { InversionesService } from '../../services/inversiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-inversion',
  imports: [NgFor,NgIf,FormsModule],
  templateUrl: './actualizar-inversion.component.html',
  styleUrl: './actualizar-inversion.component.css'
})
export class ActualizarInversionComponent implements OnInit{

  indiceSeleccionado! : number | null
  inversionesDelCliente!: inversionCompleta[] | null
  inversionesServicio = inject(InversionesService)
  router = inject(Router)

    ngOnInit(): void {
      let inversiones = localStorage.getItem('inversionesDelCliente')
        if (inversiones) {
          this.inversionesDelCliente = JSON.parse(inversiones)
          console.log('Inversiones editables: ',this.inversionesDelCliente);
        }
    }

    //Abre y cierra los campos editables del formulario 
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
          this.router);
      
          commandoEditar.editar();
          this.indiceSeleccionado = null;
      }
    }
}
