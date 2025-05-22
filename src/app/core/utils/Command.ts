import { Router } from "@angular/router";
import { inversionCompleta } from "../../routes/consulta-inversiones/consulta-inversiones.component";
import { InversionesService } from "../../services/inversiones.service";
import { TipoError } from "../../models/Error";


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
        private setTipoError: (error:TipoError)=> void
    ){
    
    }


    editar(): void {
        if (this.nuevoSaldo > this.inversiones[this.indice].saldo) {
            this.setTipoError('saldoSuperior')
            return
        }
        if (this.nuevoSaldo < 1000) {
            this.setTipoError('saldoInferior')
            return
        }

        this.inversiones[this.indice].saldoInicial = this.nuevoSaldo,
        this.inversiones[this.indice].plazo = this.nuevoPlazo

        const nuevaTasa = this.inversionesServicio.calcularTasa(this.nuevoSaldo,this.nuevoPlazo)
        const nuevoRendimiento = this.inversionesServicio.calcularRendimientoAnual(this.nuevoSaldo, nuevaTasa, this.nuevoPlazo)

        this.inversiones[this.indice].tasa= nuevaTasa
        this.inversiones[this.indice].rendimientoAnual= nuevoRendimiento
        this.inversiones[this.indice].instruccionVencimiento = this.nuevaInstruccionVencimiento

        //this.inversiones[this.indice].saldoALTermino= this.nuevoSaldo + nuevoRendimiento 
        this.inversiones[this.indice].saldo-=this.nuevoSaldo

        localStorage.setItem('inversionesDelCliente',JSON.stringify(this.inversiones))
        this.setTipoError('cambiosAplicados')
    }
}