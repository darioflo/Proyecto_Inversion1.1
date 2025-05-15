import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstruccionVencimientoComponent } from './instruccion-vencimiento.component';

describe('InstruccionVencimientoComponent', () => {
  let component: InstruccionVencimientoComponent;
  let fixture: ComponentFixture<InstruccionVencimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstruccionVencimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstruccionVencimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
