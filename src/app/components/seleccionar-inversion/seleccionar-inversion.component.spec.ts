import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionarInversionComponent } from './seleccionar-inversion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SeleccionarInversionComponent', () => {
  let component: SeleccionarInversionComponent;
  let fixture: ComponentFixture<SeleccionarInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SeleccionarInversionComponent,
        HttpClientTestingModule 
      ]
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