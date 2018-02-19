#!/bin/bash

#to run, use 'chmod +x backendCoinPriceTests.sh' then './backendCoinPriceTests.sh'

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
    echo ""
    echo "======== test output ========"
    echo ""
    echo ""


    echo "===== BTCUSD ====="
    echo ""
    echo ""


    echo "=== chasing-coins ==="
    echo ""
    echo "Output of backend /price/BTCUSD/chasing-coins call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/BTCUSD/chasing-coins ;
    echo ""
    echo ""


    echo "===== end BTCUSD tests ====="
    echo ""
    echo ""


    echo "===== XRPUSD/T ====="
    echo ""
    echo ""


    echo "=== bitstamp ==="
    echo ""
    echo "warning: bitstamp's API is unreliable:"
    echo ""
    echo "Output of backend /price/XRPUSD/bitstamp call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPUSD/bitstamp ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPUSD/bitstamp/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPUSD/bitstamp/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPUSD/bitstamp/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPUSD/bitstamp/ask ;
    echo ""
    echo ""


    echo "=== bitfinex ==="
    echo ""
    echo "Output of backend /price/XRPUSD/bitfinex call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPUSD/bitfinex ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPUSD/bitfinex/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPUSD/bitfinex/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPUSD/bitfinex/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPUSD/bitfinex/ask ;
    echo ""
    echo ""

    echo "=== hitbtc ==="
    echo ""
    echo "Output of backend /price/XRPUSDT/hitbtc call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPUSDT/hitbtc ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPUSDT/hitbtc/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPUSDT/hitbtc/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPUSDT/hitbtc/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPUSDT/hitbtc/ask ;
    echo ""
    echo ""


    echo "===== end XRPUSD/T tests ====="
    echo ""
    echo ""


    echo "===== XRPBTC ====="
    echo ""
    echo ""


    echo "=== coinegg ==="
    echo ""
    echo "Output of backend /price/XRPBTC/coinegg call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/coinegg ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPBTC/coinegg/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/coinegg/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPBTC/coinegg/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/coinegg/ask ;
    echo ""
    echo ""


    echo "=== bitfinex ==="
    echo ""
    echo "Output of backend /price/XRPBTC/bitfinex call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/bitfinex ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPBTC/bitfinex/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/bitfinex/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPBTC/bitfinex/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/bitfinex/ask ;
    echo ""
    echo ""


    echo "=== bittrex ==="
    echo ""
    echo "Output of backend /price/XRPBTC/bittrex call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/bittrex ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPBTC/bittrex/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/bittrex/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPBTC/bittrex/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/bittrex/ask ;
    echo ""
    echo ""
    

    echo "=== okex ==="
    echo ""
    echo "Output of backend /price/XRPBTC/okex call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/okex ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPBTC/okex/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/okex/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPBTC/okex/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/okex/ask ;
    echo ""
    echo ""
    

    echo "=== hitbtc ==="
    echo ""
    echo "Output of backend /price/XRPBTC/hitbtc call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/hitbtc ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPBTC/hitbtc/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/hitbtc/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPBTC/hitbtc/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC/hitbtc/ask ;
    echo ""
    echo ""


    echo "===== end XRPBTC tests ====="
    echo ""
    echo ""


    echo "===== XRPETH ====="
    echo ""
    echo ""


    echo "=== hitbtc ==="
    echo ""
    echo "Output of backend /price/XRPETH/hitbtc call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPETH/hitbtc ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPETH/hitbtc/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPETH/hitbtc/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRPETH/hitbtc/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPETH/hitbtc/ask ;
    echo ""
    echo ""


    echo "===== end XRPETH tests ====="
    echo ""
    echo ""


    echo ""
    echo ""
    echo "======== end of tests ========"
    ) > backendCoinPriceTestsOutput.txt
fi