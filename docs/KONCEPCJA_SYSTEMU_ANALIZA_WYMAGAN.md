# SKLEP INTERNETOWY
autorzy: Mateusz Popielarz, Michał Flak, Kamil Gliński

## Koncepcja Systemu:

Cel projektu:

Wykonanie aplikacji sklepu internetowego w architekturze rozproszonej.

Lista Wymagań:

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

**Główni aktorzy w systemie:**

- Administrator
- Sprzedawca
- Użytkownik

**Propozycja architektury:**

Projekt zostanie zrealizowany w architekturze rozproszonej z użyciem mikroserwisów, oraz wzorców CQRS i Event Sourcing,

CQRS pozwoli nam na podzielenie logiki na dwie części: logikę zapytań oraz logikę zmieniającą stan.

Event Sourcing użyjemy w celu osiągnięcia śledzenia zmieniającego się stanu aplikacji, każda operacja zmiany stanu będzie zapisywana w event_log, pozwoli to na szybki dostęp do historii zmian stanu w czasie całego cyklu życia obiektu.

**Propozycja Technologii:**

NodeJS, Angular, CosmosDb z MongoAPI, Azure, Swagger-UI, Docker

