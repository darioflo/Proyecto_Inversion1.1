import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarCuentaComponent } from './seleccionar-cuenta.component';

describe('SeleccionarCuentaComponent', () => {
  let component: SeleccionarCuentaComponent;
  let fixture: ComponentFixture<SeleccionarCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarCuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
