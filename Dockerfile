FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE 8080
EXPOSE 3000
EXPOSE 3001

CMD ["npm", "run", "start-dev"]
# CMD ["node", "server.js"]
