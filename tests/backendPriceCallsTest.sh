#!/bin/bash

#Backend price pulling tests V2.0
#to run, use 'chmod +x backendCoinPriceTests.sh' then './backendCoinPriceTests.sh'

#function for calling backend with specific exchange / pair as params
#$1 = pair, $2 = exchange name
callServer(){
    echo ""
    echo "=== $2 ==="
    echo ""
    echo ""
    echo "Output of backend /price/$1/$2 call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/$1/$2 ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/$1/$2/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/$1/$2/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/$1/$2/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/$1/$2/ask ;
    echo ""
    echo ""
}

echo ""
echo "========== Backend Coin Price Tests =========="
echo ""
echo "Test script checks back end price routes for different coins and exchanges"
echo ""
read -p "Continue? (y/n)" CONT
echo ""
if [ "$CONT" = "y" ]; then
    (
    echo ""
    echo ""
    echo "========== Backend Coin Price Tests =========="
    echo ""
    echo "warning: bitstamp's API is unreliable"
    echo ""
    echo "======== test output ========"
    echo ""
    echo ""
    echo ""


    echo "===== BTCUSD ====="
    echo ""
    echo ""
    callServer BTCUSD chasing-coins
    echo ""
    echo ""
    echo "===== end BTCUSD tests ====="
    echo ""
    echo ""


    echo "===== XRPUSD/T ====="
    echo ""
    echo ""
    callServer XRPUSD bitstamp
    callServer XRPUSD bitfinex
    callServer XRPUSD kraken    
    callServer XRPUSD exmo
    callServer XRPUSD cex.io    
    callServer XRPUSDT hitbtc
    callServer XRPUSDT okex
    callServer XRPUSDT poloniex
    callServer XRPUSDT bittrex
    callServer XRPUSDT gate.io
    echo ""
    echo ""
    echo "===== end XRPUSD/T tests ====="
    echo ""
    echo ""


    echo "===== XRPBTC ====="
    echo ""
    echo ""
    callServer XRPBTC coinegg
    callServer XRPBTC bitstamp
    callServer XRPBTC bitfinex
    callServer XRPBTC bittrex
    callServer XRPBTC okex
    callServer XRPBTC hitbtc
    callServer XRPBTC binance
    callServer XRPBTC poloniex
    callServer XRPBTC kraken    
    callServer XRPBTC exmo
    callServer XRPBTC cex.io
    callServer XRPBTC bitsane
    echo ""
    echo ""
    echo "===== end XRPBTC tests ====="
    echo ""
    echo ""


    echo "===== XRPETH ====="
    echo ""
    echo ""
    callServer XRPETH hitbtc
    callServer XRPETH binance
    callServer XRPETH okex
    callServer XRPETH bitsane
    callServer XRPETH bittrex
    echo ""
    echo ""
    echo "===== end XRPETH tests ====="
    echo ""
    echo ""


    echo ""
    echo ""
    echo ""
    echo "======== end of tests ========"
    ) > backendPriceCallsOutput.txt
fi