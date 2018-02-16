#!/bin/bash

#to run, use 'chmod +x backendAuthTests.sh' then './backendAuthTests.sh'
mongoClearQuitCmd='db.dropDatabase(),exit'
{
echo ""
echo "========== Backend Authentication Tests =========="
echo "WARNING: TEST SCRIPT WILL CLEAR MONGO-DB"
echo ""
echo ""
(
docker exec -it mongo /bin/bash <<'EOF'
> mongo
> db.dropDatabase()
> exit
EOF
)
echo "database cleared"
echo ""
echo "Output of backend /register call with email 'vmelkote@ucsc.edu' and password 'password' : "
echo ""
curl -d '{"email":"vmelkote@ucsc.edu", "password":"password"}' -H "Content-Type: application/json" -X POST http://localhost:3001/api/register ;
echo ""
echo ""
echo ""
echo "Output of backend /login call with email 'vmelkote@ucsc.edu' and password 'password' : "
curl -d '{"email":"vmelkote@ucsc.edu", "password":"password"}' -H "Content-Type: application/json" -X POST http://localhost:3001/api/login ;
echo ""
} > backendAuthTestsOutput.txt