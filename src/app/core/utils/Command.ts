import { TipoError } from "../../models/Error";
import { InversionesCuentasService } from "../../services/inversiones-cuentas.service";
import { InversionCuenta } from "../../models/Inversion_Cuenta";

export interface Command {
    editar():void
}

export class EditarInversionCommand implements Command{

    constructor(
        private inversiones: InversionCuenta[],
        private indice : number,
        private nuevoSaldo: number,
        private nuevoPlazo: number,
        private nuevaInstruccionVencimiento: string,
        private servicioInversionCuenta : InversionesCuentasService,
        private setTipoError: (error:TipoError)=> void
    ){
    
    }

    editar(): void {
        if (this.nuevoSaldo > this.inversiones[this.indice].cuenta.saldo) {
            this.setTipoError('saldoSuperior')
            return
        }
        if (this.nuevoSaldo < 1000) {
            this.setTipoError('saldoInferior')
            return
        }

        this.inversiones[this.indice].saldoInicial = this.nuevoSaldo,
        this.inversiones[this.indice].plazo = this.nuevoPlazo

        const nuevaTasa = this.servicioInversionCuenta.calcularTasa(this.nuevoSaldo,this.nuevoPlazo)
        const nuevoRendimiento = this.servicioInversionCuenta.calcularRendimientoAnual(this.nuevoSaldo, nuevaTasa, this.nuevoPlazo)

        this.inversiones[this.indice].tasa= nuevaTasa
        this.inversiones[this.indice].rendimientoAnual= nuevoRendimiento
        this.inversiones[this.indice].instruccionVencimiento = this.nuevaInstruccionVencimiento  as
        "" | "Reinvertir inversion-ganancia" | "Reinvertir inversion" | "Reembolso total";

        //this.inversiones[this.indice].saldoALTermino= this.nuevoSaldo + nuevoRendimiento 
        this.inversiones[this.indice].cuenta.saldo -= this.nuevoSaldo

        this.servicioInversionCuenta.editarInversionCuenta(this.inversiones[this.indice].idInversionCuenta,this.inversiones[this.indice])
        .subscribe({
            next:(data)=>{
                console.log('Datos actualizados correctamente: ',data);
            },
            error:(error)=>{
                console.log(error);
                
            }
        })
        this.setTipoError('cambiosAplicados')
    }
}