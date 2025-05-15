import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaInversionComponent } from './vista-inversion.component';

describe('VistaInversionComponent', () => {
  let component: VistaInversionComponent;
  let fixture: ComponentFixture<VistaInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaInversionComponent]
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
