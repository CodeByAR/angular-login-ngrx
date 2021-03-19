import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUserCredentials } from '../shared/interface/IUserCredentials';
import { IUserValidation } from '../shared/interface/IUserValidation';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  validateUser(user: IUserCredentials) {
    //Mock Implementation
    // if (
    //   user.username === 'MTN_user@mtn.com' &&
    //   user.password === 'MTN281#^@*'
    // ) {
    //   return of({
    //     status: 'SUCCESS',
    //   });
    // } else {
    //   return throwError('Server: Invalid Credentials!!');
    // }
    const routeUrl = `${environment.apiUrl}/user/validation`;
    return this.http.post(routeUrl, user).pipe(
      map((data: IUserValidation) => {
        if (data.IsValid) {
          return { status: 'SUCCESS' };
        } else {
          throw new Error(data.ErrMessage);
        }
      })
    );
  }
}
