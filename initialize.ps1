docker run -d -p 5000:5000 --restart=always --name registry registry:2

$beServices = @("order", "product", "app-gateway")
$services = @("frontend", "order", "product", "app-gateway")

foreach ($svc in $services) {
    docker stop "$svc-microservice"
}

foreach ($svc in $beServices) {
    docker build . --build-arg "MS_NAME=$svc-microservice" -t "docker.local:5000/$svc-microservice:latest"
}

docker build . -f .\frontend\Dockerfile -t docker.local:5000/frontend-microservice:latest

foreach ($svc in $services) {
    docker push "docker.local:5000/$svc-microservice"
}

# docker run  -p "8091:3000" -d product-microservice:local -n product-microservice
#docker run -p "8092:3000" docker.local:5000/order-microservice:latest
# docker run -p "8095:3000" -d  app-gateway-microservice:local -n app-gateway-microservice
# docker run  -p "809:80" -d frontend-microservice:local -n frontend-microservice