import { provideRouter, Routes, withRouterConfig } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { VistaSeleccionComponent } from './routes/vista-seleccion/vista-seleccion.component';
import { VistaResumenComponent } from './routes/vista-resumen/vista-resumen.component';
import { VistaInstruccionComponent } from './routes/vista-instruccion/vista-instruccion.component';
import { VistaTerminadaComponent } from './routes/vista-terminada/vista-terminada.component';
import { ConsultaInversionesComponent } from './routes/consulta-inversiones/consulta-inversiones.component';
import { SeleccionarInversionComponent } from './components/seleccionar-inversion/seleccionar-inversion.component';
import { ActualizarInversionComponent } from './routes/actualizar-inversion/actualizar-inversion.component';
import { VistaHistorialComponent } from './routes/vista-historial/vista-historial.component';
import { VistaGraficoComponent } from './routes/vista-grafico/vista-grafico.component';
import { FormularioLoginComponent } from './components/formulario-login/formulario-login.component';
import { AuthGuard } from './core/guard/inversion.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', 
    component:FormularioLoginComponent
  },
  { path: 'home', 
    component: HomeComponent 
  },
  {
    path: 'vistaInversion/:idCuenta',
    component: SeleccionarInversionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vistaSeleccion/:idCuenta/:idInversion',
    component: VistaSeleccionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vistaResumen/:idCuenta/:idInversion',
    component: VistaResumenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vistaInstruccion/:idCuenta/:idInversion',
    component: VistaInstruccionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vistaTerminada/:idCuenta/:idInversion',
    component: VistaTerminadaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'consultaInversiones',
    component: ConsultaInversionesComponent,
    canActivate: [AuthGuard],
  },
  { 
    path:'actualizarInversion', 
    component: ActualizarInversionComponent, 
    canActivate:[AuthGuard]
  },
  { 
    path:'historialInversiones', 
    component: VistaHistorialComponent, 
    canActivate:[AuthGuard]
  },
  { 
    path:'graficosInversiones', 
    component: VistaGraficoComponent, 
    canActivate:[AuthGuard]
  },
  { path: '**', component: HomeComponent },
];

  
