import { Action } from "@ngrx/store"
import { UserData, UserDataPass } from './userauth.model';

export const LOGIN = "Login";
export const LOGOUT = "Logout";
export const LOGIN_SUCCESS = "Login Success";
export const LOGIN_FAILURE = "Login Failure";
export const AUTHORIZED = "Authorized";
export const LOADING = "Loading"
export const PROGRESS_START = "Progress Show"
export const PROGRESS_END = "Progress End"

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: UserDataPass) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
    constructor(public payload: any = {}) { }
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: UserData) { }
}

export class LoginFailure implements Action {
    readonly type = LOGIN_FAILURE;
    constructor(public payload: any = {}) { }
}

export class Authorized implements Action {
    readonly type = AUTHORIZED;
    constructor(public payload: UserData = null) { }
}

export class Loading implements Action {
    readonly type = LOADING;
}

export class ProgressShow implements Action {
    readonly type = PROGRESS_START;
}

export class ProgressEnd implements Action {
    readonly type = PROGRESS_END;
}

export type ActionList =
    | Login
    | Logout
    | LoginSuccess
    | LoginFailure
    | Authorized
    | Loading
    | ProgressShow
    | ProgressEnd