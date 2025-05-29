import { inject, Injectable } from '@angular/core';
import { Cliente } from '../models/Cliente';
import { HttpClient } from '@angular/common/http';
import { Cuenta } from '../models/Cuenta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);
  clienteSeleccionado: Cliente | null;
  cuentaSeleccionada: Cuenta | null = null;
  api_clientes_url :string = 'http://localhost:8080/clientes'
  api_cuentas_url: string = 'http://localhost:8080/cuentas'
  

constructor(){
  this.clienteSeleccionado = null
  this.cuentaSeleccionada = null
}

  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('api/clientes');
  }

  obtenerCuentas():Observable<Cuenta[]>{
    return this.http.get<Cuenta[]>('api/cuentas');
  }

  obtenerClienteSeleccionado(): Cliente | null {
    return this.clienteSeleccionado;
  }
}
