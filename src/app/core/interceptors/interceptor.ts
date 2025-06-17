import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AutenticacionService } from '../../services/auth-service.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const autenticacionService= inject(AutenticacionService);
  const token = autenticacionService.obtenerToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
