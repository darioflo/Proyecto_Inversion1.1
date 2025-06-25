import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstruccionVencimientoComponent } from './instruccion-vencimiento.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InstruccionVencimientoComponent', () => {
  let component: InstruccionVencimientoComponent;
  let fixture: ComponentFixture<InstruccionVencimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InstruccionVencimientoComponent,
        HttpClientTestingModule 
      ]
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