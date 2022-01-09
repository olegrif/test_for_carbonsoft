#!/bin/bash
while true; do
RESULT=$(top -bn1 | awk '/Cpu/ { cpu = 100 - $8 "%" }; END   { print cpu }')
#echo $RESULT
curl -X POST \
  http://127.0.0.1:8080 \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
               "percentage" : "'"$RESULT"'"
}'
echo "Waiting..."
sleep 10
done
