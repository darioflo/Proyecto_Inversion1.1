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
      { montoMax: 5000,  plazoMin: 28,  plazoMax: 89,  tasaDestinada: 0.03 },
      { montoMax: 5000,  plazoMin: 90,  plazoMax: 179, tasaDestinada: 0.035 },
      { montoMax: 5000,  plazoMin: 180, plazoMax: 365, tasaDestinada: 0.04 },
  
      { montoMax: 10000, plazoMin: 28,  plazoMax: 89,  tasaDestinada: 0.032 },
      { montoMax: 10000, plazoMin: 90,  plazoMax: 179, tasaDestinada: 0.037 },
      { montoMax: 10000, plazoMin: 180, plazoMax: 365, tasaDestinada: 0.042 },
  
      { montoMax: 15000, plazoMin: 28,  plazoMax: 89,  tasaDestinada: 0.034 },
      { montoMax: 15000, plazoMin: 90,  plazoMax: 179, tasaDestinada: 0.039 },
      { montoMax: 15000, plazoMin: 180, plazoMax: 365, tasaDestinada: 0.044 },
  
      { montoMax: 20000, plazoMin: 28,  plazoMax: 89,  tasaDestinada: 0.036 },
      { montoMax: 20000, plazoMin: 90,  plazoMax: 179, tasaDestinada: 0.041 },
      { montoMax: 20000, plazoMin: 180, plazoMax: 365, tasaDestinada: 0.046 },
    ];
    for (const tasa of tasas) {
      if ( monto <= tasa.montoMax && plazo >= tasa.plazoMin && plazo <= tasa.plazoMax ) {
        return tasa.tasaDestinada;
      }
    }

    return 0
  }

  calcularRendimiento(monto: number, tasaDestinada: number): number {
    return Number((monto * tasaDestinada).toFixed(2));
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
