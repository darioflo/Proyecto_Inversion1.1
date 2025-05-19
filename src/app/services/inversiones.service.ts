import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inversion } from '../models/Inversion';

@Injectable({
  providedIn: 'root'
})
export class InversionesService {
  private http = inject(HttpClient);
  private inversionActual = new BehaviorSubject<Inversion | null>(null);
  inversionActual$ = this.inversionActual.asObservable();
  inversionesDisponibles: Inversion[] = [];
  inversionesDelCliente : Inversion[] = []
  

  calcularTasa(monto: number, plazo: number): number {
    const tasas = [
      { montoMax: 5000,  plazoMin: 28,  plazoMax: 89,  tasaDestinada: 3.0 },
      { montoMax: 5000,  plazoMin: 90,  plazoMax: 179, tasaDestinada: 3.5 },
      { montoMax: 5000,  plazoMin: 180, plazoMax: 365, tasaDestinada: 4.0 },
  
      { montoMax: 10000, plazoMin: 28,  plazoMax: 89,  tasaDestinada: 3.2 },
      { montoMax: 10000, plazoMin: 90,  plazoMax: 179, tasaDestinada: 3.7 },
      { montoMax: 10000, plazoMin: 180, plazoMax: 365, tasaDestinada: 4.2 },
  
      { montoMax: 15000, plazoMin: 28,  plazoMax: 89,  tasaDestinada: 3.4 },
      { montoMax: 15000, plazoMin: 90,  plazoMax: 179, tasaDestinada: 3.9 },
      { montoMax: 15000, plazoMin: 180, plazoMax: 365, tasaDestinada: 4.4 },
  
      { montoMax: 20000, plazoMin: 28,  plazoMax: 89,  tasaDestinada: 3.6 },
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
  calcularRendimientoAnual(monto: number, tasa: number, plazo: number): number {
    const tasaDecimal = tasa / 100;
    let montoTotalInv = (monto * tasaDecimal * plazo)/365;
    return Number(montoTotalInv.toFixed(2));
  }

  obtenerInversiones(): Observable<Inversion[]> {
    return this.http.get<Inversion[]>('/api/inversiones');
  }

  actualizarInversionActual(inversion: Inversion): void {
    this.inversionActual.next(inversion);
  }

  actualizarInversionBackend(inversion: Inversion): Observable<Inversion> {
    const url = `api/inversiones/${inversion.idInversion}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Inversion>(url, inversion, { headers });
  }
}
