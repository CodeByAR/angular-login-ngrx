FROM node:15.11.0-alpine As builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.17.1-alpine

COPY --from=builder /usr/src/app/dist/angular-login-ngrx/ /usr/share/nginx/html