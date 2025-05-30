import { Injectable } from "@angular/core";
import { InversionCuenta } from "../models/Inversion_Cuenta";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class InversionesCuentasService {
  inversionCuentaActual : InversionCuenta 
  inversionesCuentas : InversionCuenta[] = []
  private apiUrl = 'http://localhost:8080/inversionesCuentas' 
  
  constructor(private httpClient : HttpClient){
    this.inversionCuentaActual = {
      idInversionCuenta: '',
      idCuenta: { idCuenta: '' },
      idInversion: { idInversion: '' },
      estaActiva: false,
      plazo: 0,
      tasa: 0,
      rendimientoAnual: 0,
      saldoInicial: 0,
      saldoAlTermino: 0,
      instruccionVencimiento: ''
    };
    }

    /*Según los valores almacenados en el objeto tasas y luego de iterar por el mismo se analiza en base al monto y plazo 
    ingresado por el usuario y una vez este localizado su rango dentro de la condición ya tendríamos asignada la tasa.  */
      calcularTasa(monto: number, plazo: number): number {
        const tasas = [
          { montoMax: 5000,  plazoMin: 15,  plazoMax: 29,  tasaDestinada: 2.0 },
          { montoMax: 5000,  plazoMin: 30,  plazoMax: 89,  tasaDestinada: 3.0 },
          { montoMax: 5000,  plazoMin: 90,  plazoMax: 179, tasaDestinada: 3.5 },
          { montoMax: 5000,  plazoMin: 180, plazoMax: 365, tasaDestinada: 4.0 },
      
          { montoMax: 10000,  plazoMin: 15,  plazoMax: 29,  tasaDestinada: 2.0 },
          { montoMax: 10000, plazoMin: 30,  plazoMax: 89,  tasaDestinada: 3.2 },
          { montoMax: 10000, plazoMin: 90,  plazoMax: 179, tasaDestinada: 3.7 },
          { montoMax: 10000, plazoMin: 180, plazoMax: 365, tasaDestinada: 4.2 },
      
          { montoMax: 15000,  plazoMin: 15,  plazoMax: 29,  tasaDestinada: 2.0 },
          { montoMax: 15000, plazoMin: 30,  plazoMax: 89,  tasaDestinada: 3.4 },
          { montoMax: 15000, plazoMin: 90,  plazoMax: 179, tasaDestinada: 3.9 },
          { montoMax: 15000, plazoMin: 180, plazoMax: 365, tasaDestinada: 4.4 },
      
          { montoMax: 20000,  plazoMin: 15,  plazoMax: 29,  tasaDestinada: 2.0 },
          { montoMax: 20000, plazoMin: 30,  plazoMax: 89,  tasaDestinada: 3.6 },
          { montoMax: 20000, plazoMin: 90,  plazoMax: 179, tasaDestinada: 4.1 },
          { montoMax: 20000, plazoMin: 180, plazoMax: 365, tasaDestinada: 4.6 },
        ];
        for (const tasa of tasas) {
          if ( monto <= tasa.montoMax && plazo >= tasa.plazoMin && plazo <= tasa.plazoMax ) {
            return tasa.tasaDestinada;
          }
        }
        return 0
      }
    
    /*Esta función calcula el rendimiento anual en base al monto, la tasa y el plazo de inversión seleccionado por el cliente. 
    Asigna el valor al montoTotalInv de la multiplicación del monto, la tasa y el plazo dividido en 365 días.  */
      calcularRendimientoAnual(monto: number, tasa: number, plazo: number): number {
        const tasaDecimal = tasa / 100;
        let montoTotalInv = (monto * tasaDecimal * plazo)/365;
        return Number(montoTotalInv.toFixed(2));
      }

      agregarInversionCuenta(inversionCuenta: InversionCuenta){
        return this.httpClient.post<InversionCuenta>(this.apiUrl,inversionCuenta)
      }
    
  }

