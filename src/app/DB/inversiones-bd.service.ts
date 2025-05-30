import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Inversion } from '../models/Inversion';
import { Cuenta } from '../models/Cuenta';
import { Contrato } from '../models/Contrato';
import { Cliente } from '../models/Cliente';
import { InversionCuenta } from '../models/Inversion_Cuenta';

@Injectable({
  providedIn: 'root',
})
export class InversionesBDService implements InMemoryDbService {
  createDb() {
    const clientes: Cliente[] = [
      {
        idCliente: 'Cliente-001',
        nombre: 'Emilio',
        apellidoPaterno: 'Delgado',
        apellidoMaterno: 'Martínez',
        direccion: 'Ciudad de México',
      },
    ];

    const cuentas : Cuenta[] = [
      {
        id:'Cuenta-001',
        idCliente: { idCliente: clientes[0].idCliente },
        saldo: 18000,
        tipoCuenta: 'Ahorro'
      },
      {
        id:'Cuenta-002',
        idCliente: { idCliente: clientes[0].idCliente },
        saldo: 12000,
        tipoCuenta: 'Inversión'
      }
    ]

    const contratos : Contrato[]=[
      {
        idContrato:"Contrato-001",
        idCuenta:{id:cuentas[0].id},
        tipoContrato: 'Cuenta de Ahorro'
      },
      {
        idContrato:"Contrato-002",
        idCuenta:{id:cuentas[1].id},
        tipoContrato: 'Crédito Bancario'
      }
    ]

    const inversiones: Inversion[] = [
      {
        idInversion: 'Inversion-001',
        nombre: 'Futuro Seguro',
        descripcion: 'Inversión ideal para asegurar tu futuro financiero.',
        
      },
      {
        idInversion: 'Inversion-002',
        nombre: 'Visionario 360',
        descripcion: 'Plan diseñado para los visionarios del mañana.',
      },
      {
        idInversion: 'Inversion-003',
        nombre: 'Capital Zenith',
        descripcion: 'Maximiza tu capital con esta inversión estratégica.',
      },
      {
        idInversion: 'Inversion-004',
        nombre: 'Impulso Capital',
        descripcion: 'Impulsa tu capital con rendimientos garantizados.',
      },
      {
        idInversion: 'Inversion-005',
        nombre: 'Avance Dinámico',
        descripcion: 'Inversión dinámica para un crecimiento constante.',
      },
      {
        idInversion: 'Inversion-006',
        nombre: 'Rendimiento Uno',
        descripcion: 'Obtén el mejor rendimiento con esta opción única.',
      },
    ];

    const inversiones_cuentas : InversionCuenta[]=[]

    return { inversiones, clientes, inversiones_cuentas, cuentas, contratos };
  }
}