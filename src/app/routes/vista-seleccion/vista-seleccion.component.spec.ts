import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaSeleccionComponent } from './vista-seleccion.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VistaSeleccionComponent', () => {
  let component: VistaSeleccionComponent;
  let fixture: ComponentFixture<VistaSeleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VistaSeleccionComponent,
        HttpClientTestingModule 
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            paramMap: of({
              get: () => null
            }),
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});