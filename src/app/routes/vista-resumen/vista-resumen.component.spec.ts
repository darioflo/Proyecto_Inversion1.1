import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaResumenComponent } from './vista-resumen.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VistaResumenComponent', () => {
  let component: VistaResumenComponent;
  let fixture: ComponentFixture<VistaResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VistaResumenComponent,
        HttpClientTestingModule // <-- Agrega esto
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

    fixture = TestBed.createComponent(VistaResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});