import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

//Selectors have memory

// Get only the feature state (not global app state)
export const selectAuthState = createFeatureSelector<AuthState>("auth")

export const isLoggedInSelector = createSelector(
    selectAuthState,
    auth => !!auth.user
)

// Chaining of selector
export const isLoggedOutSelector = createSelector(
    isLoggedInSelector,
    loggedIn => !loggedIn
)

