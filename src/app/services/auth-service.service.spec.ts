import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AutenticacionService } from './auth-service.service';

describe('AutenticacionService', () => {
  let service: AutenticacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AutenticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
