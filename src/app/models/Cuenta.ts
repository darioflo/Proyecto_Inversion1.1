import { Cliente } from './Cliente';


export interface Cuenta {
  id?:string;
  idCuenta: string;
  idCliente: Pick<Cliente, 'idCliente'>;
  saldo: number;
}
