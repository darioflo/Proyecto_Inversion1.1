import { Component} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeleccionarCuentaComponent } from "../seleccionar-cuenta/seleccionar-cuenta.component";

/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'app-menu-lateral',
  templateUrl: 'menu-lateral.component.html',
  styleUrl: 'menu-lateral.component.css',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    NgIf,
    RouterLink,
    SeleccionarCuentaComponent
],
})
export class SidenavAutosizeExample {
  showFiller:boolean ;

  constructor(){
    this.showFiller = false

    
  }
}
