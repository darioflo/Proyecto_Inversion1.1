import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarInversionComponent } from './seleccionar-inversion.component';

describe('SeleccionarInversionComponent', () => {
  let component: SeleccionarInversionComponent;
  let fixture: ComponentFixture<SeleccionarInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarInversionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
