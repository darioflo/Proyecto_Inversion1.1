import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService{

  private apiUrl = 'http://localhost:8080/api/auth'

  constructor(private http : HttpClient) { }

  iniciarSesion(nombreUsuario: string, clave: string) {
    return this.http.post<{ jwt: string, usuario: Usuario }>(`${this.apiUrl}/login`, {
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
  
  tokenVencido(token : string) : boolean {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch (e) {
      return true; 
    }
  }

  
}
