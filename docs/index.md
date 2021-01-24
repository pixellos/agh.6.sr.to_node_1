# SKLEP INTERNETOWY
autorzy: Mateusz Popielarz, Michał Flak, Kamil Gliński

![](2021-01-23-22-22-49.png)

- [SKLEP INTERNETOWY](#sklep-internetowy)
  - [Koncepcja Systemu:](#koncepcja-systemu)
    - [Cel projektu:](#cel-projektu)
    - [Lista Wymagań:](#lista-wymagań)
      - [Główni aktorzy w systemie:](#główni-aktorzy-w-systemie)
      - [Propozycja architektury:](#propozycja-architektury)
      - [Propozycja Technologii:](#propozycja-technologii)
  - [Analiza Wymagań](#analiza-wymagań)
    - [System umożliwia:](#system-umożliwia)
  - [Opis technologi](#opis-technologi)
    - [Autoryzacja użytkownika - Auth0](#autoryzacja-użytkownika---auth0)
        - [Panel z rolami](#panel-z-rolami)
        - [Wybór ról do dodania](#wybór-ról-do-dodania)
    - [Router do requestów - Application Gateway](#router-do-requestów---application-gateway)
        - [Screen strony głównej projektu](#screen-strony-głównej-projektu)
        - [Konfiguracja ścieżek (/app-gateway-microservice)](#konfiguracja-ścieżek-app-gateway-microservice)
        - [Request aplikacji pod adres http://localhost:3000/product został przeproxowany do product-microservice, przez co wybastrakcjonowane zostały zależności i nie musimy konfigurować CORS-a](#request-aplikacji-pod-adres-httplocalhost3000product-został-przeproxowany-do-product-microservice-przez-co-wybastrakcjonowane-zostały-zależności-i-nie-musimy-konfigurować-cors-a)
    - [Warstwa intefejsu użytkownika - Angular](#warstwa-intefejsu-użytkownika---angular)
    - [Warstwa łącząca mikroserwisy - swagger](#warstwa-łącząca-mikroserwisy---swagger)
          - [Swagger-ui pozwala na testowanie aplikacji poprzez udostępnienie UI dla metod restowych, które jest generowane na podstawie kodu aplikacji](#swagger-ui-pozwala-na-testowanie-aplikacji-poprzez-udostępnienie-ui-dla-metod-restowych-które-jest-generowane-na-podstawie-kodu-aplikacji)
          - [Konfiguracja swaggera znajdującego się w `commons-microservice` dołączanego do każdego z naszych mikroserwisów node - pozwala to wszystkim mikroserwisom łatwo udostępnić swagger-ui](#konfiguracja-swaggera-znajdującego-się-w-commons-microservice-dołączanego-do-każdego-z-naszych-mikroserwisów-node---pozwala-to-wszystkim-mikroserwisom-łatwo-udostępnić-swagger-ui)
    - [Narzędzie do rekompilacji - nodemon](#narzędzie-do-rekompilacji---nodemon)
        - [Przykładowa konfiguracja nodemon odpowiadająca powyższemu pipeline](#przykładowa-konfiguracja-nodemon-odpowiadająca-powyższemu-pipeline)
        - [NodeMon automatycznie nasłuchujący na zmianę plików żródłowych i przeładujący aplikację](#nodemon-automatycznie-nasłuchujący-na-zmianę-plików-żródłowych-i-przeładujący-aplikację)
    - [Docker](#docker)
        - [Dockerfile dla BE](#dockerfile-dla-be)
        - [Dockerfile dla Angulara](#dockerfile-dla-angulara)
    - [Kubernetes](#kubernetes)
        - [Drzewo katalogu z konfiguracją kubernetsesa](#drzewo-katalogu-z-konfiguracją-kubernetsesa)
        - [Przykładowy kod deploymentu seriwisu zamówień](#przykładowy-kod-deploymentu-seriwisu-zamówień)
    - [Kubernetesss Dashboard](#kubernetesss-dashboard)
        - [Pobieranie tokena na hoście](#pobieranie-tokena-na-hoście)
        - [Ekran przedstawiający naszą aplikację, dostępne deploymenty, użyte obrazy i pody](#ekran-przedstawiający-naszą-aplikację-dostępne-deploymenty-użyte-obrazy-i-pody)
        - [Dzięki przystępnemu UI możemy skalować aplikację w locie](#dzięki-przystępnemu-ui-możemy-skalować-aplikację-w-locie)
    - [Mongo](#mongo)
        - [Nasza konfiguracja mongo dla Kubernetessa](#nasza-konfiguracja-mongo-dla-kubernetessa)
        - [Strona główna projektu mongoose](#strona-główna-projektu-mongoose)
        - [Nasza konfiguracja połączenia](#nasza-konfiguracja-połączenia)
        - [Przykładowa konfiguracja walidacji](#przykładowa-konfiguracja-walidacji)
    - [Application Insights](#application-insights)
        - [Mapa aplikacji wygenerowana na podstawie zapytań http](#mapa-aplikacji-wygenerowana-na-podstawie-zapytań-http)
        - [Dashboard App-Insights przedstawiające sumaryzacje błędów, czasu odpowiedzi i żądań do serwisów](#dashboard-app-insights-przedstawiające-sumaryzacje-błędów-czasu-odpowiedzi-i-żądań-do-serwisów)
        - [Dashboard przedstawiający błędy w aplikacji](#dashboard-przedstawiający-błędy-w-aplikacji)
        - [Dashboard przedstawiający najmniej wydajne zapytania](#dashboard-przedstawiający-najmniej-wydajne-zapytania)
        - [Dashboard przedstawiający łańcuchy zależności (nie pojedyńcze zapytania), ktore wykonują się najdłużej](#dashboard-przedstawiający-łańcuchy-zależności-nie-pojedyńcze-zapytania-ktore-wykonują-się-najdłużej)
        - [Dashboard przedstawiający logi w aplikacji](#dashboard-przedstawiający-logi-w-aplikacji)
        - [Kod konfiguracyjny BE](#kod-konfiguracyjny-be)
        - [Inicjalizacja w angularze](#inicjalizacja-w-angularze)
  - [Opis uruchomienia](#opis-uruchomienia)
        - [Przykładowy log z uruchomienia](#przykładowy-log-z-uruchomienia)
        - [Przykładowy log z uruchamiania](#przykładowy-log-z-uruchamiania)

## Koncepcja Systemu:

### Cel projektu:

Wykonanie aplikacji sklepu internetowego w architekturze rozproszonej.

### Lista Wymagań:

- rejestracja użytkownika
- logowanie (autentykacja)
- pobieranie/dodawanie/modyfikacja/usuwanie produktu (administrator)
- promocja na dany produkt (rabat)
- promocja na zakupy powyżej ustalonej kwoty
- zakup produktu
- zwrot produktu
- oddanie produktu na gwarancję
- wystawienie opinii
- kontakt za pomocą formularza

#### Główni aktorzy w systemie:

- Administrator
- Sprzedawca
- Użytkownik

#### Propozycja architektury:

Projekt zostanie zrealizowany w architekturze rozproszonej z użyciem mikroserwisów, oraz wzorców CQRS i Event Sourcing,

CQRS pozwoli nam na podzielenie logiki na dwie części: logikę zapytań oraz logikę zmieniającą stan.

Event Sourcing użyjemy w celu osiągnięcia śledzenia zmieniającego się stanu aplikacji, każda operacja zmiany stanu będzie zapisywana w event_log, pozwoli to na szybki dostęp do historii zmian stanu w czasie całego cyklu życia obiektu.

#### Propozycja Technologii:

- NodeJS
- Angular
- CosmosDb z MongoAPI
- Azure
- Swagger-UI 
- Docker


## Analiza Wymagań

**Wymagania funkcjonalne:**

### System umożliwia:
- rejestrację użytkowników
- autentykację użytkowników
- manipulacje danymi produktów
- zarządzanie promocjami
- kupno produktu oraz ewentualną reklamację po zakupie
- opublikowanie opinii o usługach sklepu
- kontakt ze sprzedawcą za pomocą formularza

**Wymagania niefunkcjonalne:**
- Stabilność systemu - SLA - Uptime - System ma byc w stanie dzialac poprawnie przez 99% czasu,
- Odporność na błędy - błędy/godzine, ktore sprawia, ze system bedzie w nieprawidlowym stanie
- Przenośność kodu - Techonologie powinny byc dobierane z mysla, o tym, ze serwer moze miec rozne architektury, metryka : Ilosc architektur procesorow zdolna do uruchomienia programu
- Czystość kodu - Cyclomatic complexity  < 11
- Jakość kodu - Zachowany proces PR, podejscie funkcyjne, metryka: ilosc plikow o > 1k loc
- Optymalizacja - sredni czas przetwarzania requestu < 1s

**Use cases:**

Rejestr zamówień:

![](./pictures/REJESTR_ZAMOWIEN.png)

Rejestr produktów:

![](./pictures/REJESTR_PRODUKTOW.png)

Diagramy klas: 

TODO_GDY_KOD_BEDZIE_GOTOWY

Diagramy komponentów: 

![](./pictures/DiagramKomponentow.svg)

Diagramy sekwencji:

![](./pictures/DIAGRAM_SEKWENCJI.svg)


Struktura danych: 

![](./pictures/StrukturaDanych.svg)

**Planowane Testy:**
Funkcjonalne, E2E


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

### Warstwa intefejsu użytkownika - Angular

Angular jest wszechstronnym narzędziem do tworzenia i kontrolowania widoków stron aplikacji na warstwie frontend  
Pozwala miedzy innymi na:
- komunikacje miedzy komponentami
- wsparcie dla wykonywania wywołań asynchronicznych
- wstrzykiwanie zależności reużywalnych serwisów
- obsługe ciasteczek(cookies)
- routing
- stylowanie (kompatybilny z bootstrap)

Świetnie współpracuje z jezykiem skryptowym Typescript, który jest rozszerzeniem jezyka Javascript 

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


### Kubernetes

Jest to narzędzie do orkiestrowania kontenerami, wykorzystujemy je do aplikacji topologii naszych serwisów - dzięki kubernetesowi mamy `Infrastructure as a code` - co jest poziomem wyżej nad ideą `environment as a code`. Dzięki temu możemy w kodzie zdefiniować 
- namespace (jest to prefix, który pomaga nam uporządkować logicznie komponenty)
- deploymenty (jest to pewien komponent grupujący)
- serwisy (abstrakcja nad grupą podów)
- zbiory replik (dostarczają narzędzia do pracy na replikach)
- pody (pojedyńcze instancje kontenerów)


![](2021-01-23-21-05-11.png)
##### Drzewo katalogu z konfiguracją kubernetsesa

![](2021-01-23-21-06-00.png)
##### Przykładowy kod deploymentu seriwisu zamówień

### Kubernetesss Dashboard

W naszych skryptach obecny jest także KubernetessDashboard - jest to aplikacja, która pozwala na łatwe zarządzanie klastrem przez gui WWW.

Aby uzyskać do niego dostęp na hoście musimy pobrać token

![](2021-01-23-21-08-15.png)
##### Pobieranie tokena na hoście

![](2021-01-23-21-08-47.png)
##### Ekran przedstawiający naszą aplikację, dostępne deploymenty, użyte obrazy i pody

![](2021-01-23-21-10-15.png)
##### Dzięki przystępnemu UI możemy skalować aplikację w locie

### Mongo

Mongo jest noSql bazą danych. Użyliśmy jej bo jest darmowa, dobrze komponuje się z Kubernetessem i pozwala na horyzontalne skalowanie. Biorąc pod uwagę konstrukcję naszej aplikacji (event sourcing / event log), jest to dla nas idealny wybór.

Mongo jest częścią naszej konfiguracji Deploymentów w kubernetesie, przez co jest tworzone razem z całą aplikacją po uruchomieniu skryptów.

![](2021-01-23-21-14-18.png)
##### Nasza konfiguracja mongo dla Kubernetessa

Do połączenia z naszą apką używamy mongose, który jest ODM (Object Domain Modeling library) i pozwala na łatwe korzystanie z obiektow JS oraz walidację ich

![](2021-01-23-21-15-59.png)
##### Strona główna projektu mongoose

![](2021-01-23-21-17-53.png)
##### Nasza konfiguracja połączenia

![](2021-01-23-21-18-28.png)
##### Przykładowa konfiguracja walidacji

### Application Insights

Jest to narzędzie stworzone przez microsoft do instrumentacji aplikacji. 
Używamy go do zbierania logów, monitorowania stanu aplikacji oraz błędów

![](2021-01-23-21-20-26.png)
##### Mapa aplikacji wygenerowana na podstawie zapytań http

![](2021-01-23-21-21-06.png)
##### Dashboard App-Insights przedstawiające sumaryzacje błędów, czasu odpowiedzi i żądań do serwisów

![](2021-01-23-21-21-59.png)
##### Dashboard przedstawiający błędy w aplikacji

![](2021-01-23-21-22-23.png)
##### Dashboard przedstawiający najmniej wydajne zapytania

![](2021-01-23-21-23-00.png)
##### Dashboard przedstawiający łańcuchy zależności (nie pojedyńcze zapytania), ktore wykonują się najdłużej

![](2021-01-23-21-24-17.png)
##### Dashboard przedstawiający logi w aplikacji

Jak widzimy, jest to kompleksowe narzędzie pozwalające na dogłębne monitorowanie aplikacji.

Konfiguracja jest jednak banalna.

W naszym bazowym mikroserwisie mamy kod konfiguracyjny

![](2021-01-23-21-25-14.png)
##### Kod konfiguracyjny BE

W angularze AI jest zainicjowane jako moduł

![](2021-01-23-21-26-09.png)
##### Inicjalizacja w angularze



[Instrukcja Uzytkownika](INSTRUKCJA_UZYTKOWNIKA.md)

## Opis uruchomienia

Uruchomienie było testowane tylko na windows.

1. WSL 2 [Instrukcja](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
2. Docker for windows [Instrukcja](https://docs.docker.com/docker-for-windows/install/)
3. Kubernetess [Instrukcja](https://docs.docker.com/docker-for-windows/#kubernetes)
4. Stworzenie obrazów dockerowych (wywołanie Initialize.ps1)

![](2021-01-23-20-47-17.png)
##### Przykładowy log z uruchomienia

5. Stworzenie serwisów kubernetesss (wywołanie pods/robto.ps1)

![](2021-01-23-20-54-22.png)
##### Przykładowy log z uruchamiania

6. Aplikacja jest dostępna na http://localhost:3000
   
   ![](2021-01-23-20-55-02.png)