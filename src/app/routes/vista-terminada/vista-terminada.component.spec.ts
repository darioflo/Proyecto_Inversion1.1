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
            paramMap: of({
              get: (key: string) => key === 'id' ? '123' : null
            })
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