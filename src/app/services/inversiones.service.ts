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
  api_inversiones_url :string = 'http://localhost:8080/inversiones'
  

  obtenerInversiones(): Observable<Inversion[]> {
    return this.http.get<Inversion[]>(this.api_inversiones_url);
  }

  actualizarInversionActual(inversion: Inversion): void {
    this.inversionActual.next(inversion);
  }

}
