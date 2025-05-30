import { Cuenta } from "./Cuenta";

export interface Contrato {
    idContrato: string;
    idCuenta: Pick<Cuenta,'id'>;
    tipoContrato: string;
  }
  