import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaResumenComponent } from './vista-resumen.component';

describe('VistaResumenComponent', () => {
  let component: VistaResumenComponent;
  let fixture: ComponentFixture<VistaResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaResumenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
