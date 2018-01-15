# EasyTrage
### Cryptocurrency Arbitrage bot written in MERN by Mike Hamilton, Kevin Lee, Vikram Melkote, and Abdul Mohamed

## About

A bot that continuously queries cryptocurrency exchanges for prices to check for an advantage that can immediately be capitalized on for instant profit. Ideally the bot would also trade on the user's behalf after they enter their API keys for different exchange accounts through the app's UI. If this is not achievable, the bot will at the very least notify the user of a good trade in a timely manner. Additionally, bot should check that the mean/median transaction time of the coin's network in a recent time period is bounded so that loss of arbitrage advantages while waiting for transfers is avoided. Lastly, the app's UI should neatly display user information such as API keys stored, trades made (if the bot is making them), % profit, etc

## Setup

1. clone repo with git or download contents
`git clone https://github.com/Vikrammel/EasyTrage.git`

2. Install node.js from [here](https://www.npmjs.com/get-npm)

3. run `sudo npm install` in project directory

4. to start the server run `sudo nodemon`
