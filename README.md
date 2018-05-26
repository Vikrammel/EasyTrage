# EasyTrage
### Cryptocurrency Arbitrage bot/helper written in MERN by Mike Hamilton, Kevin Lee, Vikram Melkote, Christopher Kong, and Abdul Mohamed

## About

A bot that continuously queries cryptocurrency exchanges for prices to check for an advantage that can immediately be capitalized on via arbitrage for instant profit. Backend Express.js API & Node.js container communicates with mongodb container to handle and data pertaining to authentication & session management, API Keys & user settings, and trade requests while updating the list of prices and arbitrage opportunities in the backend server's memory periodically. The React.js frontend communicates with the Express.js API to fetch user account data, prices, and trade suggestions as the user interacts with the UI. UI also includes a modal for visualizing and facilitating suggested trade opportunities but the backend does not yet fully execute trades, they are currently *simulated* as successful.

## Demo

### Login
![trade simulation](https://raw.githubusercontent.com/Vikrammel/EasyTrage/master/scrumdocs/demo/bad_login_demo.gif)

### Trade Suggestions
![trade simulation](https://raw.githubusercontent.com/Vikrammel/EasyTrage/master/scrumdocs/demo/other_trade_modals_demo.gif)

### Arbitrage Trade Simulation
![trade simulation](https://raw.githubusercontent.com/Vikrammel/EasyTrage/master/scrumdocs/demo/full_abtirage_simulation_demo.gif)

## Setup

1. clone repo with git or download contents
`git clone https://github.com/Vikrammel/EasyTrage.git`

2. Install Docker and docker-compose


## Run

Start app

1. Open new terminal window
2. `docker-compose up` (add `--build` if changes have been made since last `docker-compose up`)

Stopping app containers

1. `Ctrl/Cmd + C`

Access the site as a client via browser:
[http://localhost:3000](http://localhost:3000)

API test:
[http://localhost:3001/api](http://localhost:3001/api)

Accessing db shell

1. Open new terminal window
2. `docker exec -it mongo /bin/bash`
3. `mongo`

To exit mongo shell (or docker container's bash): `exit`
