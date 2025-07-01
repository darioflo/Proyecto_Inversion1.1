import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaInversionComponent } from './vista-inversion.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VistaInversionComponent', () => {
  let component: VistaInversionComponent;
  let fixture: ComponentFixture<VistaInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VistaInversionComponent,
        HttpClientTestingModule 
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
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

    fixture = TestBed.createComponent(VistaInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});