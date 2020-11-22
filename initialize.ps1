
docker stop product-microservice
docker stop order-microservice
docker stop frontend-microservice
docker stop app-gateway-microservice

docker build . --build-arg MS_NAME=app-gateway-microservice -t app-gateway-microservice:local
docker build . --build-arg MS_NAME=order-microservice -t order-microservice:local
docker build . --build-arg MS_NAME=product-microservice -t product-microservice:local

docker build . -f .\frontend\Dockerfile -t frontend-microservice:local

docker run  -p "8091:3000" -d product-microservice:local -n product-microservice
docker run -p "8092:3000" -d  order-microservice:local -n order-microservice
docker run -p "8095:3000" -d  app-gateway-microservice:local -n app-gateway-microservice
docker run  -p "809:80" -d frontend-microservice:local -n frontend-microservice