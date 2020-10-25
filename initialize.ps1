
docker stop product-microservice:local
docker stop order-microservice:local
docker stop frontend-microservice:local

docker build . -f .\product-microservice\Dockerfile-prod -t product-microservice:local
docker build . -f .\order-microservice\Dockerfile-prod -t order-microservice:local
docker build . -f .\frontend\Dockerfile-prod -t frontend-microservice:local

docker run product-microservice:local -p "8081:3000" -d
docker run order-microservice:local -p "8082:3000" -d
docker run frontend-microservice:local -p "8082:80" -d