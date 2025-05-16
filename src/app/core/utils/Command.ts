import { Router } from "@angular/router";
import { inversionCompleta } from "../../routes/consulta-inversiones/consulta-inversiones.component";
import { InversionesService } from "../../services/inversiones.service";


export interface Command {
    editar():void
}

export class EditarInversionCommand implements Command{

    constructor(
        private inversiones: inversionCompleta[],
        private indice : number,
        private nuevoSaldo: number,
        private nuevoPlazo: number,
        private nuevaInstruccionVencimiento: string,
        private inversionesServicio : InversionesService,
        private routerEditar : Router,
    ){
    
    }


    editar(): void {
        if (this.nuevoSaldo > this.inversiones[this.indice].saldo) {
            alert('La nueva inversión no puede exceder su saldo en cuenta')
            return
        }

        this.inversiones[this.indice].saldoInicial = this.nuevoSaldo,
        this.inversiones[this.indice].plazo = this.nuevoPlazo

        const nuevaTasa = this.inversionesServicio.calcularTasa(this.nuevoSaldo)
        const nuevoRendimiento = this.inversionesServicio.calcularRendimiento(this.nuevoSaldo, nuevaTasa)

        this.inversiones[this.indice].tasa= nuevaTasa
        this.inversiones[this.indice].rendimiento = nuevoRendimiento
        this.inversiones[this.indice].instruccionVencimiento = this.nuevaInstruccionVencimiento

        this.inversiones[this.indice].saldoALTermino= this.nuevoSaldo + nuevoRendimiento 
        this.inversiones[this.indice].saldo-=this.nuevoSaldo


        localStorage.setItem('inversionesDelCliente',JSON.stringify(this.inversiones))
        alert('Cambios aplicados');
        this.routerEditar.navigate(['/consultaInversiones'])
    }
}