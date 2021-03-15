import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UserState } from 'src/app/state/user.reducer';
import { isUserLoggedIn } from 'src/app/state/user.selector';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FirstPageComponent } from './first-page.component';

describe('FirstPageComponent', () => {
  let component: FirstPageComponent;
  let fixture: ComponentFixture<FirstPageComponent>;
  let mockRouter;
  let mockStore;
  let router: Router;
  let store: MockStore;
  const initialState: UserState = {
    loggedIn: false,
    error: '',
  };
  beforeEach(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockStore = jasmine.createSpyObj(['dispatch', 'select']);
    TestBed.configureTestingModule({
      declarations: [FirstPageComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('checkAndNavigate', () => {
    it('should navigate to user login when user logged out', () => {
      spyOn(store, 'select').and.returnValue(of(false));
      spyOn(router, 'navigate').and.returnValue(undefined);

      component.checkAndNavigate();

      store.select(isUserLoggedIn).subscribe((data) => {
        expect(router.navigate).toHaveBeenCalledWith(['/', 'login', 'user']);
      });
    });
    it('should not navigate to user login when user log out failed', () => {
      spyOn(store, 'select').and.returnValue(of(true));
      spyOn(router, 'navigate').and.returnValue(undefined);

      component.checkAndNavigate();

      store.select(isUserLoggedIn).subscribe((data) => {
        expect(router.navigate).toHaveBeenCalledTimes(0);
      });
    });
  });
  describe('logout', () => {
    it('should dispatch LogOut action', () => {
      spyOn(store, 'dispatch').and.returnValue(undefined);
      spyOn(store, 'select').and.returnValue(of(false));
      spyOn(router, 'navigate').and.returnValue(undefined);

      component.logout();

      expect(store.dispatch).toHaveBeenCalled();
    });
    it('should call checkAndNavigate method', () => {
      spyOn(store, 'dispatch').and.returnValue(undefined);
      spyOn(component, 'checkAndNavigate').and.returnValue(undefined);

      component.logout();

      expect(component.checkAndNavigate).toHaveBeenCalled();
    });
  });
});
