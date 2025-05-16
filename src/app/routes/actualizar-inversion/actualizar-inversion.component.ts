import { Component, OnInit } from '@angular/core';
import { inversionCompleta } from '../consulta-inversiones/consulta-inversiones.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-actualizar-inversion',
  imports: [NgFor,NgIf,FormsModule],
  templateUrl: './actualizar-inversion.component.html',
  styleUrl: './actualizar-inversion.component.css'
})
export class ActualizarInversionComponent implements OnInit{

  indiceSeleccionado! : number | null
  inversionesDelCliente!: inversionCompleta[] | null

    ngOnInit(): void {
      let inversiones = localStorage.getItem('inversionesDelCliente')
        if (inversiones) {
          this.inversionesDelCliente = JSON.parse(inversiones)
          console.log('Inversiones editables: ',this.inversionesDelCliente);
        }
    }

    toggleDetalle(i: number): void {
      this.indiceSeleccionado = this.indiceSeleccionado === i ? null : i;
    }
    guardarCambios(i:number){}
}
