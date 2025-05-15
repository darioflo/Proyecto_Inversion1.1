import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InversionCpmpletadaComponent } from './inversion-completada.component';

describe('InversionCpmpletadaComponent', () => {
  let component: InversionCpmpletadaComponent;
  let fixture: ComponentFixture<InversionCpmpletadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InversionCpmpletadaComponent]
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
