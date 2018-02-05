# EasyTrage
### Cryptocurrency Arbitrage bot written in MERN by Mike Hamilton, Kevin Lee, Vikram Melkote, Christopher Kong, and Abdul Mohamed

## About

A bot that continuously queries cryptocurrency exchanges for prices to check for an advantage that can immediately be capitalized on for instant profit. Ideally the bot would also trade on the user's behalf after they enter their API keys for different exchange accounts through the app's UI. If this is not achievable, the bot will at the very least notify the user of a good trade in a timely manner. Additionally, bot should check that the mean/median transaction time of the coin's network in a recent time period is bounded so that loss of arbitrage advantages while waiting for transfers is avoided. Lastly, the app's UI should neatly display user information such as API keys stored, trades made (if the bot is making them), % profit, etc

## Setup

1. clone repo with git or download contents
`git clone https://github.com/Vikrammel/EasyTrage.git`

2. Install Docker and docker-compose


## Run

Start server and front-end (temporary until docker is working again)
1. `npm run start-dev`

Start app (when docker is running again)

1. `docker-compose up`
2. Choose new terminal window to work in

Stopping app containers

1. `^C`

Access the site as a client via browser:
[http://localhost:3000](http://localhost:3000)

View db:
[http://localhost:3001/api](http://localhost:3001/api)

Accessing db shell

1. Open new terminal window
2. `docker exec -it mongo /bin/bash`
3. `mongo`

To exit mongo shell (or docker container's bash): `exit`
