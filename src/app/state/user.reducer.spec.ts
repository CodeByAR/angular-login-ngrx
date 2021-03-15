import { LoginFail, LoginSuccess, LogOut } from './user.actions';
import { initialState, userReducer, UserState } from './user.reducer';

describe('User Reducer', () => {
  describe('LoginSuccess action', () => {
    let mockInitialState: UserState;
    beforeEach(() => {
      mockInitialState = {
        loggedIn: false,
        error: 'Server: Invalid Credentials!!',
      };
    });
    it('should update the loggedIn true', () => {
      const state = userReducer(mockInitialState, LoginSuccess);
      expect(state.loggedIn).toBe(true);
    });
    it('should clear the error value', () => {
        const state = userReducer(mockInitialState, LoginSuccess);
        expect(state.error).toBe('');
      });
  });
  describe('LoginFail action', () => {
    let mockInitialState: UserState;
    beforeEach(() => {
      mockInitialState = {
        loggedIn: true,
        error: '',
      };
    });
    it('should update the loggedIn false', () => {
      const state = userReducer(mockInitialState, LoginFail);
      expect(state.loggedIn).toBe(false);
    });
    it('should update the error value', () => {
        const state = userReducer(mockInitialState, LoginFail({error: 'Error Occurred!!'}));
        expect(state.error).toBe('Error Occurred!!');
      });
  });
  describe('LogOut action', () => {
    let mockInitialState: UserState;
    beforeEach(() => {
      mockInitialState = {
        loggedIn: true,
        error: '',
      };
    });
    it('should restore initial state', () => {
      const state = userReducer(mockInitialState, LogOut);
      expect(state).toEqual(initialState);
    });
  });
});
