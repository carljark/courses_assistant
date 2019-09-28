import {throwError as observableThrowError,  Observable } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthtokenService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.logsrv.getLocalToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: this.logsrv.getLocalToken()
        }
      });
    }

    return next.handle(request).pipe(

    tap(event => {
      if (event instanceof HttpResponse) {
        // this.logger.logDebug(event);
        if (event.body === 'no ha sido verificado el token en el middleware') {
          this.logsrv.logout();
          this.router.navigate(['/login']);
        }
      }
    }),
    // lo siguiente creo que es un error del do no capturar el error por no responder
    // a la solicitud del graphql
    // comprobar la captura de errores en graphql del apolo-client
    catchError(err => {
      console.log('Error capturado: ', err);
      console.log('err.name: ', err.name);
      if (err.name === 'HttpErrorResponse') {
        this.logsrv.logout();
        this.router.navigate(['/login']);
      }
      return observableThrowError(err);
    }));
  }

  constructor(
    private logsrv: LoginService,
    private router: Router
    ) { }
}
