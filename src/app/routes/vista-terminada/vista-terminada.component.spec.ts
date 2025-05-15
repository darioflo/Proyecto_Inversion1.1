import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTerminadaComponent } from './vista-terminada.component';

describe('VistaTerminadaComponent', () => {
  let component: VistaTerminadaComponent;
  let fixture: ComponentFixture<VistaTerminadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaTerminadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaTerminadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
