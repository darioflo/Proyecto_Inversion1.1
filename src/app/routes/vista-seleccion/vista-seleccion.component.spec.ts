import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaSeleccionComponent } from './vista-seleccion.component';

describe('VistaSeleccionComponent', () => {
  let component: VistaSeleccionComponent;
  let fixture: ComponentFixture<VistaSeleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSeleccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
