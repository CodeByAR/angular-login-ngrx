import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthenticationGuard } from './authentication.guard';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let store;
  let router;
  beforeEach(() => {
    store = jasmine.createSpyObj(['select']);
    router = jasmine.createSpyObj(['navigate']);
    guard = new AuthenticationGuard(store, router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should be called', () => {
      store.select.and.returnValue(of(true));
      spyOn(guard, 'canActivate').and.returnValue(of(true));

      let canActivateResult = guard.canActivate(null, null);

      expect(guard.canActivate).toHaveBeenCalled();
    });
    it('should call navigate when not authorized', () => {
      store.select.and.returnValue(of(false));

      
      guard.canActivate(null, null).subscribe((data) => {
        expect(router.navigate).toHaveBeenCalledWith(['/', 'login', 'user']);
      });
    });

    it('should call navigate when authorized', () => {
      store.select.and.returnValue(of(true));

      
      guard.canActivate(null, null).subscribe((data) => {
        expect(router.navigate).toHaveBeenCalledTimes(0);
      });
    });
  });
});
