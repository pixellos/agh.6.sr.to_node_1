param(
    [bool]$shouldPush = $true,
    [bool]$shouldRun = $false
)

$beServices = @("order", "product", "app-gateway")
$services = @("frontend", "order", "product", "app-gateway")

$prefix = ""
if ($shouldPush) {
    $prefix = "docker.local:5000/"
}

foreach ($svc in $services) {
    docker stop "$svc-microservice"
}

foreach ($svc in $services) {
    docker container rm "$prefix$svc-microservice"
}

foreach ($svc in $beServices) {
    $name = "$svc-microservice:latest"
    docker build --build-arg "MS_NAME=$svc-microservice" -t "$prefix$name" .
}

docker build -f .\frontend\Dockerfile -t "$($prefix)frontend-microservice:latest" .

if ($shouldPush) {
    foreach ($svc in $services) {
        docker push "$($prefix)$($svc)-microservice"
    }
}

if ($shouldRun) {
    
    docker run -d --name product-microservice -p "3002:3000" "$($prefix)product-microservice:latest" 
    docker run -d --name order-microservice -p "3001:3000" "$($prefix)order-microservice:latest" 
    docker run -d --name app-gateway-microservice -p "3000:3000" "$($prefix)app-gateway-microservice:latest" 
    docker run -d --name frontend-microservice -p "3003:80" "$($prefix)frontend-microservice:latest" 
}