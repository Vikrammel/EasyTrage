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
    echo ""
    echo "=== chasing-coins ==="
    echo ""
    echo ""
    echo "Output of backend /price/BTCUSD/chasing-coins call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/BTCUSD/chasing-coins ;
    echo ""
    echo ""
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
    callServer XRPUSDT hitbtc
    echo ""
    echo ""
    echo "===== end XRPUSD/T tests ====="
    echo ""
    echo ""


    echo "===== XRPBTC ====="
    echo ""
    echo ""
    callServer XRPBTC coinegg
    callServer XRPBTC bitfinex
    callServer XRPBTC bittrex
    callServer XRPBTC okex
    callServer XRPBTC hitbtc
    echo ""
    echo ""
    echo "===== end XRPBTC tests ====="
    echo ""
    echo ""


    echo "===== XRPETH ====="
    echo ""
    echo ""
    callServer XRPETH hitbtc
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