$services = @("frontend", "order", "product", "app-gateway")
kubectl delete service app-gateway-microservice-deployment --namespace=aghlegro

foreach ($svc in $services) {
    kubectl delete deployment "$svc-microservice-deployment" --namespace=aghlegro
}

foreach ($svc in $services) {
    kubectl delete service "$svc-microservice-service" --namespace=aghlegro
}

kubectl apply -f https://k8s.io/examples/admin/dns/dnsutils.yaml --namespace=default
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml

kubectl apply -f .\service.yaml
kubectl apply -f .\namespace.yaml

foreach ($svc in $services) {
    kubectl apply -f ".\$svc-microservice.yaml" --namespace=aghlegro
}

write-host "Set up successfull - now app will wait for request"

kubectl expose deployment app-gateway-microservice-deployment --namespace=aghlegro
Start-Sleep 1
kubectl get services app-gateway-microservice-deployment --namespace=aghlegro
kubectl proxy

# http://localhost:8001/api/v1/namespaces/aghlegro/services/frontend-microservice-service/proxy/
# kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | sls admin-user | ForEach-Object { $_ -Split '\s+' } | Select -First 1)