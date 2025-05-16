import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
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
        apellido_paterno: 'Delgado',
        apellido_materno: 'Martínez',
        direccion: 'Ciudad de México',
      },
    ];

    const cuentas : Cuenta[] = [
      {
        idCuenta:'Cuenta-001',
        idCliente: { idCliente: clientes[0].idCliente },
        saldo: 18000,
      },
      {
        idCuenta:'Cuenta-002',
        idCliente: { idCliente: clientes[0].idCliente },
        saldo: 12000,
      }
    ]

    const contratos : Contrato[]=[
      {
        idContrato:"Contrato-001",
        idCuenta:{idCuenta:cuentas[0].idCuenta},
        tipoContrato: 'Cuenta de Ahorro'
      },
      {
        idContrato:"Contrato-002",
        idCuenta:{idCuenta:cuentas[1].idCuenta},
        tipoContrato: 'Crédito Bancario'
      }
    ]

    const inversiones: Inversion[] = [
      {
        idInversion: 'Inversion-001',
        nombre: 'Futuro Seguro',
        plazo: 0,
        tasa: 0,
        rendimiento: 0,
        rendimientoAnual:0,
        descripcion: 'Inversión ideal para asegurar tu futuro financiero.',
        saldoInicial:0,
        saldoAlTermino:0,
        instruccionVencimiento:'',
      },
      {
        idInversion: 'Inversion-002',
        nombre: 'Visionario 360',
        plazo: 0,
        tasa: 0,
        rendimiento: 0,
        rendimientoAnual:0,
        descripcion: 'Plan diseñado para los visionarios del mañana.',
        saldoInicial:0,
        saldoAlTermino:0,
        instruccionVencimiento:'',
      },
      {
        idInversion: 'Inversion-003',
        nombre: 'Capital Zenith',
        plazo: 0,
        tasa: 0,
        rendimiento: 0,
        rendimientoAnual:0,
        descripcion: 'Maximiza tu capital con esta inversión estratégica.',
        saldoInicial:0,
        saldoAlTermino:0,
        instruccionVencimiento:'',
      },
      {
        idInversion: 'Inversion-004',
        nombre: 'Impulso Capital',
        plazo: 0,
        tasa: 0,
        rendimiento: 0,
        rendimientoAnual:0,
        descripcion: 'Impulsa tu capital con rendimientos garantizados.',
        saldoInicial:0,
        saldoAlTermino:0,
        instruccionVencimiento:'',
      },
      {
        idInversion: 'Inversion-005',
        nombre: 'Avance Dinámico',
        plazo: 0,
        tasa: 0,
        rendimiento: 0,
        rendimientoAnual:0,
        descripcion: 'Inversión dinámica para un crecimiento constante.',
        saldoInicial:0,
        saldoAlTermino:0,
        instruccionVencimiento:'',
      },
      {
        idInversion: 'Inversion-006',
        nombre: 'Rendimiento Uno',
        plazo: 0,
        tasa: 0,
        rendimiento: 0,
        rendimientoAnual:0,
        descripcion: 'Obtén el mejor rendimiento con esta opción única.',
        saldoInicial:0,
        saldoAlTermino:0,
        instruccionVencimiento:'',
      },
    ];

    const inversiones_cuentas : InversionCuenta[]=[]

    return { inversiones, clientes, inversiones_cuentas, cuentas, contratos };
  }
}