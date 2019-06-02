FROM node:10-alpine

EXPOSE 3000

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app/package.json

RUN npm install

RUN npm i pm2 -g 

COPY . /src/app

CMD pm2 start --no-daemon app.js

CMD pm2 start --no-daemon subscriber.js

