import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenedorConsultasComponent } from './contenedor-consultas.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ContenedorConsultasComponent', () => {
  let component: ContenedorConsultasComponent;
  let fixture: ComponentFixture<ContenedorConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContenedorConsultasComponent,
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

    fixture = TestBed.createComponent(ContenedorConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});