import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, tap, switchMap, filter } from 'rxjs/operators';

import { AuthService } from "../service/auth.service";
import * as Auth from "./userauth.action";
import { of } from "rxjs";
import { Store } from '@ngrx/store';
import * as userAuth from './userauth.reducer'

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<userAuth.AuthState>
    ) { }

    @Effect()
    login$ = this.actions$.pipe(
        ofType(Auth.LOGIN),
        map((action: Auth.Login) => {
            this.store.dispatch(new Auth.Loading());
            return action.payload
        }),
        switchMap((auth) => this.authService.login(auth.email, auth.password)),
        filter<any>(body => body),
        map(body => {
            localStorage.setItem("auth-token", body.data.token);
            delete body.data.token;
            return new Auth.LoginSuccess(body.data)
        })
    );

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
        ofType(Auth.LOGIN_SUCCESS),
        tap((() => {
            this.route.queryParams.subscribe(params => {
                if (params.returnUrl) {
                    this.gotoReturnUrl(params.returnUrl);
                } else {
                    this.router.navigate(['home/dashboard'])
                }
            });
        })
        )
    );

    @Effect({ dispatch: false })
    loginFailure$ = this.actions$.pipe(
        ofType(Auth.LOGIN_FAILURE),
        tap((params) => {
            this.route.queryParams.subscribe(params => {

                if (params.returnUrl) {

                    this.router.navigate(["/auth/login"], {
                        queryParams: {
                            returnUrl: params.returnUrl
                        }
                    });
                } else {
                    this.router.navigate(["/auth/login"]);
                }
            }
            )
        })
    );

    @Effect()
    logout$ = this.actions$.pipe(
        ofType(Auth.LOGOUT),
        map(() => {
            localStorage.removeItem("auth-token");
            return new Auth.LoginFailure()
        }),
        catchError(error => of(new Auth.LoginFailure())
        )
    );

    @Effect()
    authorized$ = this.actions$.pipe(
        ofType(Auth.AUTHORIZED),
        map((action: Auth.Authorized) => {
            this.store.dispatch(new Auth.Loading());
            return action.payload
        }),
        switchMap(() => this.authService.verifyUser()),
        filter<any>(body => body),
        map(body => {
            localStorage.setItem("auth-token", body.data.token);
            delete body.data.token;
            return new Auth.LoginSuccess(body.data)
        }),
        catchError(error => of(new Auth.LoginFailure())
        )
    );

    gotoReturnUrl(url) {
        const urlArray = url.split('?');
        let returnUrl = urlArray && urlArray.length > 0 ? urlArray[0] : '/home'
        let queryParams = urlArray && urlArray.length > 1 ? urlArray[1] : '';
        if (queryParams) {
            queryParams = queryParams.split("&").join(",");
            queryParams = queryParams.split("=").join(":");
            queryParams = "{" + queryParams + "}";
        }
        try {
            if (queryParams) {
                this.router.navigate([returnUrl], {
                    queryParams: this.strToObj(queryParams)
                })
            } else {
                this.router.navigate([returnUrl], {})

            }
        } catch (error) {
            console.log(error);
            this.router.navigate([returnUrl], {})
        }
    }

    strToObj(str) {
        var obj = {};
        if (str && typeof str === 'string') {
            var objStr = str.match(/\{(.)+\}/g);
            eval("obj =" + objStr);
        }
        return obj
    }
}
