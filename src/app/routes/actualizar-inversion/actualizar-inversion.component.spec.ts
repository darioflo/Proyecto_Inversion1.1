import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarInversionComponent } from './actualizar-inversion.component';

describe('ActualizarInversionComponent', () => {
  let component: ActualizarInversionComponent;
  let fixture: ComponentFixture<ActualizarInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarInversionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
