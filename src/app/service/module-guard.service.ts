import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ModuleGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return new Observable<boolean>(observer => {
      console.log(localStorage.getItem("auth-token"));
      if (localStorage.getItem("auth-token")) {
        console.log("1");
        observer.next(true);
      } else {
        console.log("2");
        this.router.navigate(['/auth/login'])
        observer.next(false);
      }
    });
  }
}
