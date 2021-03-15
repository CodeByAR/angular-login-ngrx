import { isUserLoggedIn, errMessage } from './user.selector';
import { userReducer, UserState } from './user.reducer';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

describe('User Reducer', () => {
  let mockInitialState: UserState = {
    loggedIn: false,
    error: 'Server: Invalid Credentials!!',
  };
//   let mockStore;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//         imports: [
//             StoreModule.forRoot({user: userReducer})           
//         ],
//         declarations: [],
//         providers: [{
//             provide: Store, 
//             useClass: class { select = jasmine.createSpy('select'); dispatch = jasmine.createSpy('dispatch'); }
//         }]
//     })
//     mockStore = TestBed.get(Store);
//   });
  describe('isUserLoggedIn', () => {
    it('should return loggedIn property from state', ()=> {
        expect(isUserLoggedIn.projector(mockInitialState)).toBe(mockInitialState.loggedIn);
    })
  })
  describe('errMessage', () => {
    it('should return error property from state', ()=> {
        expect(errMessage.projector(mockInitialState)).toBe(mockInitialState.error);
    })
  })
});
