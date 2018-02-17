FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

EXPOSE 8080
EXPOSE 3000
EXPOSE 3001

CMD ["npm", "run", "start-dev"]
