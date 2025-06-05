import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaHistorialComponent } from './vista-historial.component';

describe('VistaHistorialComponent', () => {
  let component: VistaHistorialComponent;
  let fixture: ComponentFixture<VistaHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
