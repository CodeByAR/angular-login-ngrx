import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserState } from 'src/app/state/user.reducer';
import { errMessage, isUserLoggedIn } from 'src/app/state/user.selector';

import { UserLoginComponent } from './user-login.component';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let store: MockStore;
  let router;
  const initialState: UserState = {
    loggedIn: false,
    error: '',
  };
  let errMessage$ = new ReplaySubject(1);
  let isUserloggedin$ = new ReplaySubject(1);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserLoginComponent],
      imports: [RouterTestingModule.withRoutes([]), ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    spyOn(store, 'select')
      .withArgs(isUserLoggedIn)
      .and.returnValue(isUserloggedin$.asObservable())
      .withArgs(errMessage)
      .and.returnValue(errMessage$.asObservable());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign userLoggedIn$', async () => {
    expect(component.userLoggedIn$).toBeDefined();
  });

  it('should assign errMessage$', async () => {
    expect(component.errMessage$).toBeDefined();
  });

  describe('checkAndNavigate', () => {
    it('should call router navigate when user is logged in', () => {
      isUserloggedin$.next(true);

      component.checkAndNavigate();

      component.userLoggedIn$.pipe(take(1)).subscribe((res) => {
        expect(router.navigate).toHaveBeenCalledWith([
          '/',
          'page',
          'first-page',
        ]);
      });
    });
    it('should not call router navigate when user is not logged in', () => {
      isUserloggedin$.next(false);

      component.checkAndNavigate();

      component.userLoggedIn$.pipe(take(1)).subscribe((res) => {
        expect(router.navigate).toHaveBeenCalledTimes(0);
      });
    });
  });
  describe('onSubmit', () => {
    it('should dispatch action', () => {
      spyOn(store, 'dispatch').and.returnValue(undefined);

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
