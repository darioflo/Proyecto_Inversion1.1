import { Component, inject, OnInit } from '@angular/core';
import { SidenavAutosizeExample } from "../../components/menu-lateral/menu-lateral.component";
import { ObtenerClienteAutenticado } from '../../core/utils/obtener-cliente-autenticado';
import { AutenticacionService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SidenavAutosizeExample],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends ObtenerClienteAutenticado implements OnInit {
    
  autenticacionService = inject(AutenticacionService)
  router = inject(Router)

  ngOnInit(): void {
    if (window.localStorage && typeof window !== 'undefined' && localStorage.getItem("token")) {
      if (!this.clienteServicio.clienteSeleccionado) {
        this.obtenerClienteAutenticado();
        console.log(this.clienteServicio.clienteSeleccionado);
      }
      this.obtenerCuentas(); 
      console.log(this.autenticacionService.estaAutenticado());
    }
    else{
      this.router.navigate(['/login']);
    }
    
  }
}
