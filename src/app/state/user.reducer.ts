import { createReducer, on, props } from '@ngrx/store';
import { IUserCredentials } from '../shared/interface/IUserCredentials';
import { LoginFail, LoginSuccess, LogOut } from './user.actions';

export interface UserState {
  loggedIn: boolean;
  error: string;
}

export const initialState: UserState = {
  loggedIn: false,
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(LoginSuccess, (state) => ({
    loggedIn: true,
    error: '',
  })),
  on(LoginFail, (state, props) => ({
    loggedIn: false,
    error: props.error,
  })),
  on(LogOut, (state, props) => ({
    ...initialState,
  }))
);
