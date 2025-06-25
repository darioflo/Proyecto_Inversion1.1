import { TestBed } from '@angular/core/testing';

import { InversionesService } from './inversiones.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InversionesService', () => {
  let service: InversionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(InversionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
