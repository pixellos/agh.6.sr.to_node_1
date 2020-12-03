kubectl delete pod frontend-microservice --namespace=aghlegro
kubectl delete service frontend-microservice-service --namespace=aghlegro

kubectl apply -f .\service.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
kubectl apply -f .\namespace.yaml
kubectl apply -f https://k8s.io/examples/admin/dns/dnsutils.yaml --namespace=default
kubectl apply -f .\frontend-microservice.yaml --namespace=aghlegro

kubectl proxy
# http://localhost:8001/api/v1/namespaces/aghlegro/services/frontend-microservice-service/proxy/
# kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | sls admin-user | ForEach-Object { $_ -Split '\s+' } | Select -First 1)