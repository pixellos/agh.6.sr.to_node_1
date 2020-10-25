
docker stop product-microservice
docker stop order-microservice
docker stop frontend-microservice

docker build . -f .\product-microservice\Dockerfile-prod -t product-microservice:local
docker build . -f .\order-microservice\Dockerfile-prod -t order-microservice:local
docker build . -f .\frontend\Dockerfile-prod -t frontend-microservice:local

docker run  -p "8091:3000" -d product-microservice:local -n product-microservice
docker run -p "8092:3000" -d  order-microservice:local -n order-microservice
docker run  -p "8093:80" -d frontend-microservice:local -n frontend-microservice