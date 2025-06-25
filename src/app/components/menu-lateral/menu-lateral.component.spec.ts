import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavAutosizeExample } from './menu-lateral.component';

describe('SidenavAutosizeExample', () => {
  let component: SidenavAutosizeExample;
  let fixture: ComponentFixture<SidenavAutosizeExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavAutosizeExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavAutosizeExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
