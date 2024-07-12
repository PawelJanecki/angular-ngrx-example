import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { isLoggedIn } from "./auth.selector";
import { tap } from "rxjs/operators";

export const authenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const store = inject(Store<AppState>)
  const router = inject(Router);

  return store.select(isLoggedIn())
    .pipe(
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          router.navigateByUrl('/login')
        }
      })
    )
}