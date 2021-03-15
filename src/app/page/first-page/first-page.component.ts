import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogOut } from 'src/app/state/user.actions';
import { UserState } from 'src/app/state/user.reducer';
import { isUserLoggedIn } from 'src/app/state/user.selector';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss'],
})
export class FirstPageComponent {
  constructor(private store: Store<UserState>, private router: Router) {}
  logout() {
    this.store.dispatch(LogOut());
    this.checkAndNavigate();
  }

  checkAndNavigate(){
    this.store.select(isUserLoggedIn).subscribe((res) => {
      if (!res) {
        this.router.navigate(['/', 'login', 'user']);
      }
    });
  }
}
