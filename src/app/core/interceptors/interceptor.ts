import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AutenticacionService } from '../../services/auth-service.service';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AutenticacionService);
  const token = authService.obtenerToken();
  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }
  return next(req);
};

