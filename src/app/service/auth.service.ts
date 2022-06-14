import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  getTokenHeader(): HttpHeaders {

    const token = localStorage.getItem("auth-token");
    return new HttpHeaders({
      "Content-Type": "application/json",
      "auth-token": token || []
    });
  }

  verifyUser(retryCount: number = 0): Observable<boolean> {

    const url = `verify/user/authentication`
    return this.http.get<any>(url).pipe(
      retry(retryCount),
      // map(res=>{
      //   console.log(res);
      //   if(res.status == 200){
      //     return true;
      //   }else{
      //     return false;
      //   }
      // }),
      catchError(this.handleError)
    );
  }

  login(username, password, retryCount: number = 0): Observable<any> {

    const url = `login/user/${username}/${password}`
    return this.http.get(url).pipe(
      retry(retryCount),
      catchError(this.handleError)
    );
  }

  logout(): boolean {

    localStorage.clear()
    return true;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
