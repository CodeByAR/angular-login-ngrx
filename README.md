# angular-login-ngrx
The application implements a login page in angular with NgRx. The user navigates to first page (Sample page) of the application after successful login.

## How to Run?
Run below commands in command prompt after cloning/downloading the code
1. ***npm install*** - to doownload all the dependencies specified in package.json
2. ***npm start*** - to start the application (will be available on localhost:4200)

## Test Code Coverage
![image](https://user-images.githubusercontent.com/39939363/111121781-20170b80-8593-11eb-826e-43a676f8273e.png)

## Improvement Scope
1. User login session can be managed on page reload
2. Wild card route can be setup for better error handling
3. Preloading strategy can be implemented for optimizing application first load time
4. Global error handler can be implemented to manage the logs
5. HTTP interceptor can be added for managing request headers 
6. Routing can be handled with const/enum for maintaining source of truth
7. User related information can be added in store to make it readily available
8. NgRx devtools can be integrated to enhance developers coding experience
