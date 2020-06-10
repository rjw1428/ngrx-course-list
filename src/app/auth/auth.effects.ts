import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

    loginEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            tap(action => {
                localStorage.setItem('user', JSON.stringify(action.user))
                this.router.navigateByUrl('/courses')
            })
        ), { dispatch: false })

    logoutEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(action => {
                localStorage.removeItem('user')
                this.router.navigateByUrl('/login')
            })
        ), { dispatch: false })

    constructor(
        private actions$: Actions,
        private router: Router
        ) {

    }
}