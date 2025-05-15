export interface Inversion {
  idInversion: string;
  nombre: string;
  descripcion: string;
  plazo: number;
  tasa: number;
  rendimiento: number;
  saldoInicial: number,
    saldoAlTermino: number,
    instruccionVencimiento:
    | 'Reinvertir ganancia'
    | 'Reinvertir inversion'
    | 'Reembolso total'
    | '';
}
