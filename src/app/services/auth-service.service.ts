import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService{

  private apiUrl = 'http://localhost:8080/api/auth'

  constructor(private http : HttpClient) { }

  iniciarSesion(nombreUsuario: string, clave: string) {
    return this.http.post<{ jwt: string }>(`${this.apiUrl}/login`, {
      nombreUsuario: nombreUsuario,
      clave: clave,
    });
  }

  cerrarSesion() {
    localStorage.removeItem('token');
  }

  obtenerToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  estaAutenticado() {
    return !!this.obtenerToken();//operador que convierte cualquier valor en TS o JS a su equivalente booleano
  }
}
