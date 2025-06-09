import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaGraficoComponent } from './vista-grafico.component';

describe('VistaGraficoComponent', () => {
  let component: VistaGraficoComponent;
  let fixture: ComponentFixture<VistaGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaGraficoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
