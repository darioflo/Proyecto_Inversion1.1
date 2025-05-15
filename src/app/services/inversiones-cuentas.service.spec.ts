import { TestBed } from '@angular/core/testing';

import { InversionesCuentasService } from './inversiones-cuentas.service';

describe('InversionesCuentasService', () => {
  let service: InversionesCuentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InversionesCuentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
