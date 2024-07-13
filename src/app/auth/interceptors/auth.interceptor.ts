import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  let cloneRequest = req; 
  const token = localStorage.getItem('token');

  if(token) {
    cloneRequest = cloneRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`
      }
    })

    return next(cloneRequest);
  }

  return next(req);
};