import { provideRouter, Routes, withRouterConfig } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { VistaSeleccionComponent } from './routes/vista-seleccion/vista-seleccion.component';
import { VistaResumenComponent } from './routes/vista-resumen/vista-resumen.component';
import { VistaInstruccionComponent } from './routes/vista-instruccion/vista-instruccion.component';
import { VistaTerminadaComponent } from './routes/vista-terminada/vista-terminada.component';
import { ConsultaInversionesComponent } from './routes/consulta-inversiones/consulta-inversiones.component';
import { SeleccionarInversionComponent } from './components/seleccionar-inversion/seleccionar-inversion.component';
import { inversionGuard } from './core/guard/inversion.guard';
import { ActualizarInversionComponent } from './routes/actualizar-inversion/actualizar-inversion.component';
import { VistaHistorialComponent } from './routes/vista-historial/vista-historial.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'vistaInversion/:idCuenta',
    component: SeleccionarInversionComponent,
    canActivate: [inversionGuard],
  },
  {
    path: 'vistaSeleccion/:idCuenta/:idInversion',
    component: VistaSeleccionComponent,
    canActivate: [inversionGuard],
  },
  {
    path: 'vistaResumen/:idCuenta/:idInversion',
    component: VistaResumenComponent,
    canActivate: [inversionGuard],
  },
  {
    path: 'vistaInstruccion/:idCuenta/:idInversion',
    component: VistaInstruccionComponent,
    canActivate: [inversionGuard],
  },
  {
    path: 'vistaTerminada/:idCuenta/:idInversion',
    component: VistaTerminadaComponent,
    canActivate: [inversionGuard],
  },
  {
    path: 'consultaInversiones',
    component: ConsultaInversionesComponent,
    canActivate: [inversionGuard],
  },
  { 
    path:'actualizarInversion', 
    component: ActualizarInversionComponent, 
    canActivate:[inversionGuard]
  },
  { 
    path:'historialInversiones', 
    component: VistaHistorialComponent, 
    canActivate:[inversionGuard]
  },
  { path: '**', component: HomeComponent },
];
