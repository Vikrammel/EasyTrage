#!/bin/bash

#to run, use 'chmod +x backendAuthTests.sh' then './backendAuthTests.sh'
{
echo ""
echo "========== Backend Authentication Tests =========="
echo "If registration gives email in use error, clear database"
echo ""
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