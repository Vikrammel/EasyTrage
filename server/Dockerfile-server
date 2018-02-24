FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 3001

CMD npm install; npm install nodemon -g; nodemon server.js
