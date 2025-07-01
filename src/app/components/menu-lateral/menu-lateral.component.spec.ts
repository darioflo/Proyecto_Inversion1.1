import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavAutosizeExample } from './menu-lateral.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SidenavAutosizeExample', () => {
  let component: SidenavAutosizeExample;
  let fixture: ComponentFixture<SidenavAutosizeExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidenavAutosizeExample,
        HttpClientTestingModule // <-- Agrega esto
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            paramMap: of({
              get: () => null
            }),
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
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