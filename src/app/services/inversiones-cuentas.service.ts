import { Injectable } from "@angular/core";
import { InversionCuenta } from "../models/Inversion_Cuenta";


@Injectable({
  providedIn: 'root'
})
export class InversionesCuentasService {
  inversionCuentaActual : InversionCuenta | null
  inversionesCuentas : InversionCuenta[] 

  constructor(){
    this.inversionCuentaActual = null
    this.inversionesCuentas = []
  }

}
