import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaInversionComponent } from './vista-inversion.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
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
            params: of({ id: '123' }),
            paramMap: of({
              get: (key: string) => key === 'id' ? '123' : null
            })
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