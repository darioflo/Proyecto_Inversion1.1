import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaHistorialComponent } from './vista-historial.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('VistaHistorialComponent', () => {
  let component: VistaHistorialComponent;
  let fixture: ComponentFixture<VistaHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VistaHistorialComponent,
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

    fixture = TestBed.createComponent(VistaHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});