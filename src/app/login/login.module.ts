import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { LoginRoutingModule } from './login-routing/login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserLoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
