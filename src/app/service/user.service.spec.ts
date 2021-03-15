import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpClient;
  beforeEach(() => {
    httpClient = jasmine.createSpyObj(['get', 'post']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClient,
        },
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validateUser', () => {
    it('should return success when credentails are valid', () => {
      let userCred = {
        username: 'MTN_user@mtn.com',
        password: 'MTN281#^@*',
      };
      service.validateUser(userCred).subscribe((data) => {
        expect(data.status).toBe('SUCCESS');
      });
    });
    it('should throw error when credentails are valid', () => {
      let userCred = {
        username: 'MTN_user@abc.com',
        password: 'MTN281#^@*',
      };
      service.validateUser(userCred).subscribe(
        (data) => {},
        (err) => {
          expect(err).toBe('Server: Invalid Credentials!!');
        }
      );
    });
  });
});
