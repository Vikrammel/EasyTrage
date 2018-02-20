#!/bin/bash

#to run, use 'chmod +x backendAuthTests.sh' then './backendAuthTests.sh'
mongoUse='use easytrage'
mongoClear='db.dropDatabase()'
mongoExit='exit'

echo ""
echo "========== Backend Authentication Tests =========="
echo ""
echo "WARNING: TEST SCRIPT WILL CLEAR MONGO-DB"
echo ""
read -p "Continue? (y/n)" CONT
echo ""
if [ "$CONT" = "y" ]; then
    (
    echo ""
    echo "========== Backend Authentication Tests =========="
    echo ""
    echo ""
    echo "===== clearing database ====="
    echo ""
    docker exec -it mongo /bin/bash | mongo <<'EOF'
    use easytrage
    db.dropDatabase()
    exit
EOF
    <<< exit
    echo ""
    echo "===== database cleared ====="
    echo ""
    echo ""

    echo "======== test output ========"
    echo ""
    echo ""
    echo "Output of backend /register call with email 'vmelkote@ucsc.edu' and password 'password' : "
    echo ""
    curl -d '{"email":"vmelkote@ucsc.edu", "password":"password"}' -H "Content-Type: application/json" -X POST http://localhost:3001/auth/register ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /login call with email 'vmelkote@ucsc.edu' and password 'password' : "
    echo ""
    curl -d '{"email":"vmelkote@ucsc.edu", "password":"password"}' -H "Content-Type: application/json" -X POST http://localhost:3001/auth/login ;
    echo ""
    echo ""
    echo ""
    echo "Output of backend /register call with email 'vmelkote@ucsc.edu' and password 'password' for the second time (should fail): "
    echo ""
    curl -d '{"email":"vmelkote@ucsc.edu", "password":"password"}' -H "Content-Type: application/json" -X POST http://localhost:3001/auth/register ;
    echo ""
    echo ""
    echo "======== end of tests ========"
    ) > backendAuthTestsOutput.txt
fi