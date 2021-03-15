import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject, throwError } from 'rxjs';
import { UserService } from '../service/user.service';
import { UserEffects } from './user.effects';
import { UserState } from './user.reducer';
import { IUserCredentials } from '../shared/interface/IUserCredentials';
import { LoginValidate } from './user.actions';
import { LoginAction } from '../shared/enum/login.enum';
import { take } from 'rxjs/operators';

class MockUserService {
  validateUser(user: IUserCredentials) {
    return of({ status: 'SUCCESS' });
  }
}

class MockUserServiceError {
  validateUser(user: IUserCredentials) {
    return throwError('Server: Invalid Credentials!!');
  }
}

describe('User Effects', () => {
  let actions$;
  let effects: UserEffects;
  let store: MockStore<UserState>;
  let userService: UserService;
  const initialState: UserState = {
    loggedIn: false,
    error: '',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: UserService, useClass: MockUserService },
      ],
    });
    effects = TestBed.inject(UserEffects);
    store = TestBed.inject(MockStore);
    userService = TestBed.inject(UserService);
  });
  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should result in LOGIN SUCCESS when API succeeds', () => {
    actions$ = new ReplaySubject(1);
    actions$.next({
      type: LoginAction.LOGIN_VALIDATE,
      userCred: {
        username: '',
        password: '',
      },
    });
    effects.getUserLogin$.pipe(take(1)).subscribe((res) => {
      expect(res.type).toBe(LoginAction.LOGIN_SUCCESS);
    });
  });
  it('should result in LOGIN FAIL when API errors', () => {
    spyOn(userService, 'validateUser').and.returnValue(throwError('error'));
    actions$ = new ReplaySubject(1);
    actions$.next({
      type: LoginAction.LOGIN_VALIDATE,
      userCred: {
        username: '',
        password: '',
      },
    });
    effects.getUserLogin$.pipe(take(1)).subscribe((res) => {
      expect(res.type).toBe(LoginAction.LOGIN_FAIL);
    });
  });
});
