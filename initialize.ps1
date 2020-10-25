
docker stop product-microservice:local
docker stop order-microservice:local
docker stop frontend-microservice:local

docker build . -f .\product-microservice\Dockerfile-prod -t local
docker build . -f .\order-microservice\Dockerfile-prod -t local
docker build . -f .\frontend\Dockerfile-prod -t local

docker run product-microservice:local -p 8081:3000
docker run order-microservice:local -p 8082:3000
docker run frontend-microservice:local -p 8082:80