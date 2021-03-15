import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUserCredentials } from 'src/app/shared/interface/IUserCredentials';
import { LoginFail, LoginValidate } from 'src/app/state/user.actions';
import { UserState } from 'src/app/state/user.reducer';
import { errMessage, isUserLoggedIn } from 'src/app/state/user.selector';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  errMessage$: Observable<string>;
  userLoggedIn$: Observable<boolean>;
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<UserState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userLoggedIn$ = this.store.select(isUserLoggedIn);
    this.errMessage$ = this.store.select(errMessage);
  }

  onSubmit() {
    // if (this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      let userCred: IUserCredentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.store.dispatch(LoginValidate({ userCred }));
      this.checkAndNavigate();
    // } 
    // else {
    //   this.store.dispatch(LoginFail({ error: 'Invalid Credentials!!' }));
    // }
  }

  checkAndNavigate() {
    this.userLoggedIn$.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'page', 'first-page']);
      }
    });
  }
}
