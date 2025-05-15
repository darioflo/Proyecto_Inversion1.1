import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesInversionComponent } from './detalles-inversion.component';

describe('DetallesInversionComponent', () => {
  let component: DetallesInversionComponent;
  let fixture: ComponentFixture<DetallesInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesInversionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
