import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarSaldoPlazoComponent } from './seleccionar-saldo-plazo.component';

describe('SeleccionarSaldoPlazoComponent', () => {
  let component: SeleccionarSaldoPlazoComponent;
  let fixture: ComponentFixture<SeleccionarSaldoPlazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarSaldoPlazoComponent]
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
