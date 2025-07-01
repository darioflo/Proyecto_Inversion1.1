import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaInversionesComponent } from './consulta-inversiones.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ConsultaInversionesComponent', () => {
  let component: ConsultaInversionesComponent;
  let fixture: ComponentFixture<ConsultaInversionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConsultaInversionesComponent,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            paramMap: of({
              get: () => null
            })
          }
        }
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