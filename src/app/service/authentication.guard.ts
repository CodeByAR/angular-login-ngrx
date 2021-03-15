import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from '../state/user.reducer';
import { isUserLoggedIn } from '../state/user.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private store: Store<UserState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
     Observable<boolean> {
    return this.store.select(isUserLoggedIn).pipe(
      map((res: boolean) => {
        if (!res) {
          this.router.navigate(['/', 'login', 'user']);
        }
        return res;
      })
    );
  }
}
