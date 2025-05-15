import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { inversionGuard } from './inversion.guard';

describe('inversionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => inversionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
