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
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem("token");
      if (!token || this.autenticacionService.tokenVencido(token)) {
        if (this.router.url !== '/login') {
          this.router.navigate(['/login']);
        }
        return;
      }
      if (!this.clienteServicio.clienteSeleccionado) {
        this.obtenerClienteAutenticado();
        console.log(this.clienteServicio.clienteSeleccionado);
      }
      this.obtenerCuentas();
    } else {
      if (this.router.url !== '/login') {
        this.router.navigate(['/login']);
      }
    }
  }
}
