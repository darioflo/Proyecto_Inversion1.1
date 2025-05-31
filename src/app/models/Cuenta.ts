import { Cliente } from './Cliente';


export interface Cuenta {
  id :string;
  idCliente: Pick<Cliente, 'idCliente'>;
  saldo: number;
  tipoCuenta : 'Ahorro' | 'Inversión' | 'Corriente';
  numeroCuenta: string;
}
