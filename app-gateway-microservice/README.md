# Ustawianie URLi mikroserwisów
Plik `config/gateway.config.yml`:

```
serviceEndpoints:
  product:
    url: 'http://host.docker.internal:1114/product'
  order:
    url: 'http://host.docker.internal:1113/order'
  frontend:
    url: 'http://host.docker.internal:1111/'
```

Serwis app-gateway-microservice oczekuje że będzie działał na porcie 3000:
```
http:
  port: 3000
```

Ustawienia administratorskie są dostępne na porcie:
```
admin:
  port: 9876
  host: localhost
```
Który nie jest aktualnie eksponowany z dockera.