import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { Store, select } from "@ngrx/store";
import { isLoggedInSelector } from "./auth.selectors";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private store: Store<AppState>,
        private router: Router
        ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(isLoggedInSelector),
            tap(loggedIn => {
                if (!loggedIn)
                    this.router.navigateByUrl('/login')
            })
        )
    }
}