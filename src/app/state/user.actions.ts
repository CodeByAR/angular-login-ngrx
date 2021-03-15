import { createAction, props } from '@ngrx/store';
import { LoginAction } from '../shared/enum/login.enum';
import { IUserCredentials } from '../shared/interface/IUserCredentials';

export const LoginValidate = createAction(
  LoginAction.LOGIN_VALIDATE,
  props<{ userCred: IUserCredentials }>()
);
export const LoginSuccess = createAction(
  LoginAction.LOGIN_SUCCESS
);
export const LoginFail = createAction(
  LoginAction.LOGIN_FAIL,
  props<{ error: string }>()
);
export const LogOut = createAction(LoginAction.LOG_OUT);
