import { TestBed } from '@angular/core/testing';

import { InversionesCuentasService } from './inversiones-cuentas.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InversionesCuentasService', () => {
  let service: InversionesCuentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(InversionesCuentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
