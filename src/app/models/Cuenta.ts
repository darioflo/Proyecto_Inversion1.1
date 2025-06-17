import { Cliente } from './Cliente';


export interface Cuenta {
  idCuenta :string;
  idCliente: Pick<Cliente, 'idCliente'>;
  saldo: number;
  tipoCuenta : 'Ahorro' | 'Inversión' | 'Corriente';
  numeroCuenta: string;
}
