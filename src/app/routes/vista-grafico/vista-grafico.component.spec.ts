import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaGraficoComponent } from './vista-grafico.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('VistaGraficoComponent', () => {
  let component: VistaGraficoComponent;
  let fixture: ComponentFixture<VistaGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VistaGraficoComponent,
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

    fixture = TestBed.createComponent(VistaGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});