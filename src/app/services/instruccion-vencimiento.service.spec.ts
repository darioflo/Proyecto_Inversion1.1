import { TestBed } from '@angular/core/testing';

import { InstruccionVencimientoService } from './instruccion-vencimiento.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InstruccionVencimientoService', () => {
  let service: InstruccionVencimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(InstruccionVencimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
