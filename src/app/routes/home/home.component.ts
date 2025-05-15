import { Component, OnInit } from '@angular/core';
import { SidenavAutosizeExample } from "../../components/menu-lateral/menu-lateral.component";
import { ObtenerClienteAutenticado } from '../../core/utils/obtener-cliente-autenticado';

@Component({
  selector: 'app-home',
  imports: [SidenavAutosizeExample],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends ObtenerClienteAutenticado implements OnInit {
  
  
  ngOnInit(): void {
    if (!this.clienteServicio.clienteSeleccionado) {
      this.obtenerClienteAutenticado();
    }
    this.obtenerCuentas(); // <-- Siempre cargar cuentas
  }
}
