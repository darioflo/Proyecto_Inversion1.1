import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VistaTerminadaComponent } from './vista-terminada.component';
import { ActivatedRoute } from '@angular/router';

describe('VistaTerminadaComponent', () => {
  let component: VistaTerminadaComponent;
  let fixture: ComponentFixture<VistaTerminadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaTerminadaComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),          
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
