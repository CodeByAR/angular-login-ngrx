import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { IUserCredentials } from '../shared/interface/IUserCredentials';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  validateUser(user: IUserCredentials) {
    if (user.username === 'MTN_user@mtn.com' && user.password === 'MTN281#^@*') {
      return of({
        status: 'SUCCESS',
      });
    } else {
      return throwError('Server: Invalid Credentials!!');
    }
  }
}
