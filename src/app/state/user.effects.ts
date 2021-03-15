import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { LoginFail, LoginSuccess, LoginValidate } from './user.actions';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { UserService } from '../service/user.service';

@Injectable()
export class UserEffects {
  constructor(private action$: Actions, private userService: UserService) {}

  getUserLogin$ = createEffect(() =>
    this.action$.pipe(
      //tap(res => console.log(res)),
      ofType(LoginValidate),
      mergeMap((action) =>
        this.userService.validateUser(action.userCred).pipe(
          map((data) => LoginSuccess()),
          catchError((error) => {
            return of(LoginFail({ error: error }));
          })
        )
      )
    )
  );
}
