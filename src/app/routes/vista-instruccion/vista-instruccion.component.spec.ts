import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaInstruccionComponent } from './vista-instruccion.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VistaInstruccionComponent', () => {
  let component: VistaInstruccionComponent;
  let fixture: ComponentFixture<VistaInstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VistaInstruccionComponent,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'idInversion') return '123';
                  if (key === 'idCuenta') return '456';
                  return null;
                }
              }
            }
          }
        }
      ]
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