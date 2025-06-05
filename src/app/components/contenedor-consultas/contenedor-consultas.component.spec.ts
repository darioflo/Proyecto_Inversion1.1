import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorConsultasComponent } from './contenedor-consultas.component';

describe('ContenedorConsultasComponent', () => {
  let component: ContenedorConsultasComponent;
  let fixture: ComponentFixture<ContenedorConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorConsultasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
