import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()

export class TokenInterceptor implements HttpInterceptor{
  constructor(
    private auth: AuthService,
  ) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.getToken()) {
      req = req.clone({
        setHeaders: {
          authorization: `Bearer ${this.auth.getToken()}`
        }
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => this.handleAuthError(error))
    );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    return throwError(error);
  }
}
