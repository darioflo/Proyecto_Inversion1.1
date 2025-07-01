import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VistaTerminadaComponent } from './vista-terminada.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VistaTerminadaComponent', () => {
  let component: VistaTerminadaComponent;
  let fixture: ComponentFixture<VistaTerminadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VistaTerminadaComponent,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
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
    }).compileComponents();

    fixture = TestBed.createComponent(VistaTerminadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});