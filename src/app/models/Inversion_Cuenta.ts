import { Cuenta } from "./Cuenta";
import { Inversion } from "./Inversion";

export interface InversionCuenta{
    idInversionCuenta: string,
    idCuenta : Pick<Cuenta,'idCuenta'>
    idInversion : Pick<Inversion,'idInversion'>
    estaActiva : boolean
}