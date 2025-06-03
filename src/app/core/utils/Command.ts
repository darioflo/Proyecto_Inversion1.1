import { TipoError } from "../../models/Error";
import { InversionesCuentasService } from "../../services/inversiones-cuentas.service";
import { InversionCuenta } from "../../models/Inversion_Cuenta";
import { inject } from "@angular/core";
import { ClienteService } from "../../services/cliente.service";


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

    
/*Este método primeramente se encarga de ejecutar las validaciones en caso de que el nuevoSaldo sea superior al saldo 
de la cuenta del cliente o inferior a los 1000 MXN permitidos como valor mínimo luego se encarga de asignar cada uno 
de los nuevos valores a las claves de la inversión seleccionada. */

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