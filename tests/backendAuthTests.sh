#!/bin/bash

#to run, use 'chmod +x backendAuthTests.sh' then './backendAuthTests.sh'
mongoUse='use easytrage'
mongoClear='db.dropDatabase()'
mongoExit='exit'
{
echo ""
echo "========== Backend Authentication Tests =========="
echo "WARNING: TEST SCRIPT WILL CLEAR MONGO-DB"
echo ""
echo ""
# (
# docker exec -it mongo /bin/bash <<'EOF'
# > mongo
# > use easytrage
# > db.dropDatabase()
# > exit
# EOF
# )
(
    docker exec -it mongo /bin/bash | mongo <<'EOF'
    use easytrage
    db.dropDatabase()
    exit
    exit
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