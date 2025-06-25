import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionarSaldoPlazoComponent } from './seleccionar-saldo-plazo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SeleccionarSaldoPlazoComponent', () => {
  let component: SeleccionarSaldoPlazoComponent;
  let fixture: ComponentFixture<SeleccionarSaldoPlazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SeleccionarSaldoPlazoComponent,
        HttpClientTestingModule 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarSaldoPlazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});