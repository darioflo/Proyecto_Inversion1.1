import { Component, inject, OnInit } from '@angular/core';
import { inversionCompleta } from '../consulta-inversiones/consulta-inversiones.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { EditarInversionCommand } from '../../core/utils/Command';
import { InversionesService } from '../../services/inversiones.service';
import { ErrorComponentComponent } from "../../components/error-component/error-component.component";
import { TipoError } from '../../models/Error';
import { Router } from '@angular/router';

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
  router = inject(Router)

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

/*Esta función primero comprueba que existan las inversionesDelCliente y guarda en otra variable la inversión que con el 
índice correspondiente al índice introducido como parámetro en esta función este índice se obtiene mediante el ngFor 
del archivo html de este componente. Crea luego una instancia de la clase EditarInversionCommand  pasándole como argumentos 
las inversiones del cliente, el saldo inicial, el plazo, la instrucción de vencimiento, el servicio de inversiones y un método 
que va a actualizar la variable tipoError encargada de identificar el tipo de excepción que va a lanzar el software en caso 
de que los datos introducidos no sean los correctos. */
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
