curl -X PUT -i http://localhost:3000/profiles/1 \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Danh",
        "description": "Handsome man"
}'