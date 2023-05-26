# Build the Docker image
```
docker build -t microservice-name .
```

# Run the Docker container
```
docker run -p 300X:300X microservice-name
```

# Run the entire app using docker-compose
```
docker-compose up --build
```

# Remove all containers
```
docker container prune -f
```

# Remove all images from system
docker image prune -f -a

# Once Krakend (via docker-compose) is up and running, you can hit the exposed end points as follows
Assuming you run all four microservices on your local machine, you can then make HTTP requests to perform calculations. For example:

Addition:       http://localhost:8080/addition/100/5
Subtraction:    http://localhost:8080/subtraction/100/5
Multiplication: http://localhost:8080/multiplication/100/5
Division:       http://localhost:8080/division/100/5
Percentage:     http://localhost:8080/functions/percentage/100/5
Square-root:    http://localhost:8080/functions/square-root/100
Log:            http://localhost:8080/functions/log/100
greeting:       http://localhost:8080/functions/greeting
Fake-API:       http://localhost:8080/fake-api/protected

Each request will return a JSON response with the calculated result.

# Register a new user
```
curl -X POST -H "Content-Type: application/json" -d '{"username": "john", "password": "pass123"}' http://localhost:8080/auth/register
```

# Login an existing user
```
curl -X POST -H "Content-Type: application/json" -d '{"username": "john", "password": "pass123"}' http://localhost:8080/auth/login
```

# Verify an existing user
```
curl -X GET -H "Authorization: Bearer <JWT_TOKEN>" http://localhost:8080/auth/verify
```

# Call a protected end point
```
curl --location 'http://localhost:8080/fake-api/protected' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6InNpbTIifQ.eyJhdWQiOiJodHRwOi8vYXBpLmNhbGxhaGFuLW1hcmtldHBsYWNlLmNvbSIsImV4cCI6MTczNTY4OTYwMCwiaXNzIjoiaHR0cHM6Ly9rcmFrZW5kLmlvIiwianRpIjoiM2U5OWIyNWUtNWUwMi00ZTUyLWJlMzMtY2M4ZDdmZjkwZWY3Iiwicm9sZXMiOlsidXNlciJdLCJzdWIiOiJqb2huIn0.gflGpRJeYZbJ3m3SbhdrkCeeI60oP0XbtCgChQNe95Q'
```

# command to generate endpoint.tmpl
```
tree template -J -P "ep_*.tmpl" -I "endpoints.tmpl" \
| jq -r ' ( .[0].contents[].name | "{{ template \"\(.)\" . }}," )' \
| sed '$s/,$//' > endpoints.tmpl
```