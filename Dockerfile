FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install
COPY . /usr/src/app

EXPOSE 8080

CMD ["node", "app.js"]
