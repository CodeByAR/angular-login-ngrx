import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

const getUserCredentialsSelector = createFeatureSelector<UserState>('user');

export const isUserLoggedIn = createSelector(
    getUserCredentialsSelector,
    state => state.loggedIn
);

export const errMessage = createSelector(
    getUserCredentialsSelector,
    state => state.error
)