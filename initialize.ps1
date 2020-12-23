docker run -d -p 5000:5000 --restart=always --name registry registry:2

$beServices = @("order", "product", "app-gateway")
$services = @("frontend", "order", "product", "app-gateway")

foreach ($svc in $services) {
    docker stop "$svc-microservice"
}

foreach ($svc in $services) {
    docker container rm "$svc-microservice"
}

foreach ($svc in $beServices) {
    docker build . --build-arg "MS_NAME=$svc-microservice" -t "docker.local:5000/$svc-microservice:latest"
}

docker build . -f .\frontend\Dockerfile -t docker.local:5000/frontend-microservice:latest

foreach ($svc in $services) {
    docker push "docker.local:5000/$svc-microservice"
}

docker run -d --name product-microservice -p "30033:3000" docker.local:5000/product-microservice:latest 
docker run -d --name order-microservice -p "3002:3000" docker.local:5000/order-microservice:latest 
docker run -d --name app-gateway-microservice -p "3001:3000" docker.local:5000/app-gateway-microservice:latest 
docker run -d --name frontend-microservice -p "3000:80" docker.local:5000/frontend-microservice:latest 