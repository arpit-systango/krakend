# Build the Docker image
docker build -t microservice-name .

# Run the Docker container
docker run -p 300X:300X microservice-name

# Remove all containers
docker container prune -f

# Remove all images from system
docker image prune -f -a

# Once Krakend (via docker-compose) is up and running, you can hit the exposed end points as follows
Assuming you run all four microservices on your local machine, you can then make HTTP requests to perform calculations. For example:

Addition:       http://localhost:3001/addition/100/5
Subtraction:    http://localhost:3002/subtraction/100/5
Multiplication: http://localhost:3003/multiplication/100/5
Division:       http://localhost:8080/division/25/5
Percentage:     http://localhost:8080//functions/percentage/100/10

Each request will return a JSON response with the calculated result.