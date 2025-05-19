export interface Inversion {
  idInversion: string;
  nombre: string;
  descripcion: string;
  plazo: number;
  tasa: number;
  rendimientoAnual:number;
  saldoInicial: number,
    saldoAlTermino: number,
    instruccionVencimiento:
    | 'Reinvertir inversion-ganancia'
    | 'Reinvertir inversion'
    | 'Reembolso total'
    | '';
}
