## Opis technologi

### Autoryzacja użytkownika - Auth0

Jako, że domyślnie auth0 nie przekazuje ról dodana została `reguła` - jest to fragment kodu w auth0, który pozwala na wykonanie akcji podczas pozyskiwaniu tokenu usera na serwerach auth 0`

```javascript
function setRolesToUser(user, context, callback) {
  context.idToken['https://any-namespace/roles'] = context.authorization.roles;
  context.accessToken['https://any-namespace/roles'] = context.authorization.roles;
  callback(null, user, context);
}
```

Ta funkcja wystawia jako `https://any-namespace/roles` role dodane w interfejsie Auth0 - są one kopiowane do tokena.

![](2021-01-17-08-54-43.png)
##### Panel z rolami


![](2021-01-17-08-55-04.png)

##### Wybór ról do dodania

### Router do requestów - Application Gateway

Gdy mamy aplikację mikroserwisową w celu zmiejszenia poziomu zależności użyty został API Gateway pattern - polega on na ukryciu faktu, że tak na prawdę zamiast do jednego serwisu robimy zapytania do wielu mikroserwisów.

Z jednej strony mamy możliwość śledzenia wszystkich zapytań, które aplikacja wykonuje, z drugiej możemy podmieniać mikroserwisy, ścieżki do nich i adresy do mikroserwisów w prosty sposób, ponieważ w mikroserwisach wykorzystujemy tylko adres application gatewaya.

W tym celu napisaliśmy aplikację node z użyciem biblioteki `Express gateway`

![](2021-01-23-19-41-44.png)
##### Screen strony głównej projektu


![](2021-01-23-19-42-37.png)
##### Konfiguracja ścieżek (/app-gateway-microservice)


Pozwoliło nam to podzielić aplikację na 3 części

1. Frontendową - routowaną gdy żadna inna ścieżka nie pasuje
2. Order-Microservice - api mikroserwisu zamówień
3. Product-Microservice - api mikroserwisu produktu
4. Swagger - proxy do endpointu z dokumentacją

Osiągneliśmy dzięki temu możliwość przyszłej rozbudowy, podziału ścieżek w mikroserwisach na różne mikroserwisy bez łamania wstecznej kompatybilności

![](2021-01-23-19-50-20.png)
##### Request aplikacji pod adres http://localhost:3000/product został przeproxowany do product-microservice, przez co wybastrakcjonowane zostały zależności i nie musimy konfigurować CORS-a


### Warstwa łącząca mikroserwisy - swagger

Jako, że rest-api nie posiada żadnego standardowego mechanizmu dokumentacji endpointów zastosowaliśmy
- swagger
- swagger-ui
- tsoa - biblioteka do typescript pozwalająca na generowanie pliku swaggera z kontrolerów
- openapi-generator-cli - narzędzie pozwalające generować klienta do api, żeby nie musieć pisać ich ręcznie

Które pozwoliły nam uporościć komunikację pomiędzy poszczególnymi mikroserwisami a także debugowanie i developowanie aplikacji

![](2021-01-23-19-52-41.png)
###### Swagger-ui pozwala na testowanie aplikacji poprzez udostępnienie UI dla metod restowych, które jest generowane na podstawie kodu aplikacji


![](2021-01-23-19-56-30.png)
###### Konfiguracja swaggera znajdującego się w `commons-microservice` dołączanego do każdego z naszych mikroserwisów node - pozwala to wszystkim mikroserwisom łatwo udostępnić swagger-ui

### Narzędzie do rekompilacji - nodemon

Domyślnie node nie ma narzędzi do wspomagania procesu developementu - po zmianie kodu należy zrestartować proces Node, co jest uciążliwe i prowadzi do błędów.

W naszym projekcie użyliśmy nodemon do 
- Przeładowania aplikacji gdy pliki src się zmienią
- Uruchomienie `tsoa` które generuje pliki `swagger` i automatyczną konfiguracje routów w Express.js
- Uruchomienie `openapi-generator-cli` generującego klienta do api po każdej zmianie, aby były zawsze aktualne

![](2021-01-23-20-01-21.png)
##### Przykładowa konfiguracja nodemon odpowiadająca powyższemu pipeline

![](2021-01-23-20-02-39.png)
##### NodeMon automatycznie nasłuchujący na zmianę plików żródłowych i przeładujący aplikację



### Docker

Docker jest standardem w konteneryzacji. Szczególnie gra dużą rolę w systemach rozproszonych, gdy musimy zamiast przewidywania wszystkich możliwych błędów skupić się na tym, żeby aplikacja mogła jak najszybciej i możliwe bezpiecznie przywrócić się do działania.

Aby takie podejście bylo możliwe nasza aplikacja musi być samowystarczalna - do tego służy docker - jego idea "Environment as a code" obiecuje nam, że będziemy w stanie odtworzyć naszą aplikację bez czasochłonnej konfiguracji sprzętu.

W naszej aplikacji mamy główny dockerfile zajmujący się budową wszystkich mikroserwisów, poprzez zbudowanie 'commonsów' a później aplikacji, ustawienie wspólnych zmiennych środowiskowych i wreszcie odpaleniem aplikacji serwerowej w jednolity sposób.

To podejście pozwoliło nam łatwo skonteneryzować wszystkie mikroserwisy back-endowe

![](2021-01-23-20-06-02.png)
##### Dockerfile dla BE


Jako, że na front-end mamy angulara nie mogliśmy użyć tego samego pliku, więc dla niego przygotowany został osobny

![](2021-01-23-20-08-10.png)
##### Dockerfile dla Angulara


 