echo ""
echo "========== Backend Coin Price Tests =========="
echo ""
echo "Test script checks back end api/price, api/price/pair, and api/suggestions routes"
echo ""
read -p "Continue? (y/n)" CONT
echo ""
if [ "$CONT" = "y" ]; then
    (
    echo ""
    echo ""
    echo "========== Backend  Price Tests =========="
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
    curl -X GET http://localhost:3001/api/price/BTCUSD ;
    echo ""
    echo ""
    echo "===== end BTCUSD test ====="
    echo ""
    echo ""


    echo "===== XRPUSD/T ====="
    echo ""
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPUSDT ;
    echo ""
    echo ""
    echo "===== end XRPUSD/T test ====="
    echo ""
    echo ""


    echo "===== XRPBTC ====="
    echo ""
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPBTC ;
    echo ""
    echo ""
    echo "===== end XRPBTC test ====="
    echo ""
    echo ""


    echo "===== XRPETH ====="
    echo ""
    echo ""
    curl -X GET http://localhost:3001/api/price/XRPETH ;
    echo ""
    echo ""
    echo "===== end XRPETH test ====="
    echo ""
    echo ""

    echo "===== All Prices ====="
    echo ""
    echo ""
    curl -X GET http://localhost:3001/api/price ;
    echo ""
    echo ""
    echo "===== end all prices test ====="
    echo ""
    echo ""

    echo "===== Suggestions ====="
    echo ""
    echo ""
    curl -X GET http://localhost:3001/api/suggestions ;
    echo ""
    echo ""
    echo "===== end suggestions test ====="
    echo ""
    echo ""


    echo ""
    echo ""
    echo ""
    echo "======== end of tests ========"
    ) > backendSuggestionsAndGeneralPriceOutput.txt
fi