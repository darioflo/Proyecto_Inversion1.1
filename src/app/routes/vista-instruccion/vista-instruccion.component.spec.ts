import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaInstruccionComponent } from './vista-instruccion.component';

describe('VistaInstruccionComponent', () => {
  let component: VistaInstruccionComponent;
  let fixture: ComponentFixture<VistaInstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaInstruccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaInstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
