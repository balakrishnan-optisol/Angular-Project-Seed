import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as userAuthRed from './userauth.reducer';

export interface AuthState {
    status: userAuthRed.AuthState,
    progress:userAuthRed.ProgressState
}

export interface State {
    auth: AuthState;
}

export const reducers = {
    status: userAuthRed.AuthReducer,
    progress:userAuthRed.ProgressReducer
};

export const selectAuthState = createFeatureSelector<AuthState>('user_auth');

export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state: AuthState) => state.status
);

export interface ProgressState {
    progress_status: userAuthRed.ProgressState;
}

export const selectProgressStatusState = createSelector(
    selectAuthState,
    (state: AuthState) => state.progress
);

export const getIsLoggedIn = createSelector(
    selectAuthStatusState,
    userAuthRed.getIsLoggedIn
);

export const getIsLoading = createSelector(
    selectAuthStatusState,
    userAuthRed.getIsLoading
);

export const getShowProgress = createSelector(
    selectProgressStatusState,
    userAuthRed.getShowProgress
);

export const getUserData = createSelector(
    selectAuthStatusState,
    userAuthRed.getUserData
);