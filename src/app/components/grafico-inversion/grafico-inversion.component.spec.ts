import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoInversionComponent } from './grafico-inversion.component';

describe('GraficoInversionComponent', () => {
  let component: GraficoInversionComponent;
  let fixture: ComponentFixture<GraficoInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoInversionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
