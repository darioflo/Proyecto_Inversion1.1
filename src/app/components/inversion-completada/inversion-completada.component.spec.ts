import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InversionCpmpletadaComponent } from './inversion-completada.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InversionCpmpletadaComponent', () => {
  let component: InversionCpmpletadaComponent;
  let fixture: ComponentFixture<InversionCpmpletadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InversionCpmpletadaComponent,
        HttpClientTestingModule 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InversionCpmpletadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});