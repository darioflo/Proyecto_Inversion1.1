import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-formulario-login',
  imports: [FormsModule, NgIf],
  templateUrl: './formulario-login.component.html',
  styleUrl: './formulario-login.component.css'
})
export class FormularioLoginComponent implements OnInit {
    nombreUsuario: string = '';
    clave: string = '';
    error: string | null = null;
  
    constructor(
      private autenticacionServicio: AutenticacionService,
      private router: Router
    ) {}

    ngOnInit(): void {
        if (localStorage.getItem("token")) {
          this.router.navigate(['/home']);
        }
      
    }
  
    iniciarSesion() {
      this.autenticacionServicio.iniciarSesion(this.nombreUsuario, this.clave)
      .subscribe({
        next: (respuesta) => {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('token', respuesta.jwt); 
          }
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.error = 'Usuario o clave incorrectos';
          console.log(error);
          
        }
      });
    }
  }
  

