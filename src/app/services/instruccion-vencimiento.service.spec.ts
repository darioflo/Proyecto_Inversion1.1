import { TestBed } from '@angular/core/testing';

import { InstruccionVencimientoService } from './instruccion-vencimiento.service';

describe('InstruccionVencimientoService', () => {
  let service: InstruccionVencimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstruccionVencimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
