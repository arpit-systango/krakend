# Build the Docker image
docker build -t microservice-name .

# Run the Docker container
docker run -p 300X:300X microservice-name

# Run the entire app using docker-compose
docker-compose up --build

# Remove all containers
docker container prune -f

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

Each request will return a JSON response with the calculated result.

# Register a new user
curl -X POST -H "Content-Type: application/json" -d '{"username": "john", "password": "pass123"}' http://localhost:8080/auth/register

# Login an existing user
curl -X POST -H "Content-Type: application/json" -d '{"username": "john", "password": "pass123"}' http://localhost:8080/auth/login

# Verify an existing user
curl -X GET -H "Authorization: Bearer <JWT_TOKEN>" http://localhost:8080/auth/verify
