import { NgIf } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TipoError } from '../../models/Error';



@Component({
  selector: 'app-error-component',
  imports: [NgIf],
  templateUrl: './error-component.component.html',
  styleUrl: './error-component.component.css'
})
export class ErrorComponentComponent {

  tipoError = input<TipoError>('');
  cerrarVentana = output<void>();
}
