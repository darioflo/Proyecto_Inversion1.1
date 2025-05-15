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
  

  calcularTasa(monto: number): number {
    if (monto < 5000) return 0.03;
    if (monto < 10000) return 0.045;
    if (monto < 15000) return 0.05;
    if (monto < 20000) return 0.06;
    return 0.08;
  }
  calcularRendimiento(monto: number, tasa: number): number {
    return monto * tasa;
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
