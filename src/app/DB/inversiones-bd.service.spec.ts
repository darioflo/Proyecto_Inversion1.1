import { TestBed } from '@angular/core/testing';

import { InversionesBdService } from './inversiones-bd.service';

describe('InversionesBdService', () => {
  let service: InversionesBdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InversionesBdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
