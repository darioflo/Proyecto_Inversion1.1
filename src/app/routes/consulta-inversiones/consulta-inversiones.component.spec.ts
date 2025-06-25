import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaInversionesComponent } from './consulta-inversiones.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConsultaInversionesComponent', () => {
  let component: ConsultaInversionesComponent;
  let fixture: ComponentFixture<ConsultaInversionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConsultaInversionesComponent,
        HttpClientTestingModule 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaInversionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});