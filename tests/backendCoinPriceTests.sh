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
    echo "=== chasing-coins ==="
    echo ""
    echo "Output of backend /price/BTC/chasing-coins call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/BTC/chasing-coins ;
    echo ""
    echo ""
    echo "=== bitstamp ==="
    echo ""
    echo "warning: bitstamp's API is unreliable:"
    echo ""
    echo "Output of backend /price/XRP/bitstamp call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/bitstamp ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRP/bitstamp/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/bitstamp/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRP/bitstamp/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/bitstamp/ask ;
    echo ""
    echo ""
    echo "=== coinegg ==="
    echo ""
    echo "Output of backend /price/XRP/coinegg call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/coinegg ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRP/coinegg/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/coinegg/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRP/coinegg/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/bitstamp/ask ;
    echo ""
    echo ""
    echo "=== bittrex ==="
    echo ""
    echo "Output of backend /price/XRP/bittrex call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/bittrex ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRP/bittrex/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/bittrex/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRP/bittrex/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/bittrex/ask ;
    echo ""
    echo ""
    echo "=== bitfinex ==="
    echo ""
    echo "Output of backend /price/XRP/bitfinex call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/bitfinex ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRP/bitfinex/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/bitfinex/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRP/bitfinex/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/bitfinex/ask ;
    echo ""
    echo ""
    echo "=== okex ==="
    echo ""
    echo "Output of backend /price/XRP/okex call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/okex ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRP/okex/bid call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/okex/bid ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /price/XRP/okex/ask call : "
    echo ""
    curl -X GET http://localhost:3001/api/price/XRP/okex/ask ;
    echo ""
    echo ""
    echo ""
    echo "======== end of tests ========"
    ) > backendCoinPriceTestsOutput.txt
fi