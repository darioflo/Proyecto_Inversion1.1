import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './inversion.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be defined', () => {
    expect(AuthGuard).toBeDefined();
  });
});