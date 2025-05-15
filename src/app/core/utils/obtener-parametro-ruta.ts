import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export class ParametrosDeVista {
  private router = inject(ActivatedRoute);
  idVista: string | null = null;
  idCuenta: string | null = null;

  obtenerIDPagina() {
    this.idVista = this.router.snapshot.paramMap.get('idInversion');
    this.idCuenta = this.router.snapshot.paramMap.get('idCuenta');
    console.log(
      'ID de la página:',
      this.idVista,
      'ID de cuenta',
      this.idCuenta
    );
  }
}
