import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { RootService } from './root.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return new Observable<boolean>(observer => {

            this.authService.verifyUser().subscribe((result) => {
                this.router.navigate(['home/dashboard'])
            }, error => {
                console.log("2");
                
                this.router.navigate(['/auth/login'])
                observer.next(false);
            })
        });
    }
}
