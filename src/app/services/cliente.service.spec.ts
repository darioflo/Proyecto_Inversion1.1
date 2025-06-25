import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ClienteService } from './cliente.service';


runTest(() => {
  let service: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),         // para HttpClient real (no recomendado aquí)
        provideHttpClientTesting(), // para pruebas
        ClienteService
      ]
    });
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

function runTest(arg0: () => void) {
  throw new Error('Function not implemented.');
}
