import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment'
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as Auth from "../state-management/userauth.action";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private store: Store
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.store.dispatch(new Auth.ProgressShow());

    const auth = this.injector.get(AuthService);
    const clonedRequest = request.clone({
      headers: auth.getTokenHeader(),
      url: this.fixUrl(request.url)
    });

    // return next.handle(clonedRequest);
    return next.handle(clonedRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.store.dispatch(new Auth.ProgressEnd());
        }
        return event;
      }),catchError( response => {        
        this.store.dispatch(new Auth.ProgressEnd());
        return throwError(response);
      })
    );
  }

  private fixUrl(url: string) {
    if (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
      return url;
    } else {
      return environment.API_ADDRESS + url;
    }
  }
}
