import { Cuenta } from "./Cuenta";
import { Inversion } from "./Inversion";

export interface InversionCuenta{
    idInversionCuenta: string,
    idCuenta : Pick<Cuenta,'id'>
    idInversion : Pick<Inversion,'idInversion'>
    estaActiva : boolean
    plazo: number;
    tasa: number;
    rendimientoAnual:number;
    saldoInicial: number,
    saldoAlTermino: number,
    instruccionVencimiento:'Reinvertir inversion-ganancia' | 'Reinvertir inversion' | 'Reembolso total' | '';
}