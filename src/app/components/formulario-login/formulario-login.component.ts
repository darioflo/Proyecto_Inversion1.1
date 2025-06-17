import { Component } from '@angular/core';
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
export class FormularioLoginComponent {
    nombreUsuario: string = '';
    clave: string = '';
    error: string | null = null;
  
    constructor(
      private autenticacionServicio: AutenticacionService,
      private router: Router
    ) {}
  
    iniciarSesion() {
        this.autenticacionServicio.iniciarSesion(this.nombreUsuario, this.clave);
        this.error = null;
        this.router.navigate(['/home']); 
    }
  }
  

