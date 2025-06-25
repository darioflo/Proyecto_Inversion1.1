import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficoCrecimientoComponent } from './grafico-inversion.component';
import { Chart, registerables } from 'chart.js'; 

Chart.register(...registerables); 
describe('GraficoCrecimientoComponent', () => {
  let component: GraficoCrecimientoComponent;
  let fixture: ComponentFixture<GraficoCrecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoCrecimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoCrecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});