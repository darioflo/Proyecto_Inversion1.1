import { Cuenta } from "./Cuenta";
import { Inversion } from "./Inversion";

export interface InversionCuenta{
    idInversionCuenta: string,
    cuenta : Pick<Cuenta,'idCuenta' | 'numeroCuenta' | 'saldo'>
    inversion : Pick<Inversion,'idInversion' | 'nombre'>
    estaActiva : boolean
    plazo: number;
    tasa: number;
    rendimientoAnual:number;
    saldoInicial: number,
    saldoAlTermino: number,
    instruccionVencimiento:'Reinvertir inversion-ganancia' | 'Reinvertir inversion' | 'Reembolso total' | '';
    fechaInicio: string;
    fechaFin : string
}