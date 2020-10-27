# SKLEP INTERNETOWY
autorzy: Mateusz Popielarz, Michał Flak, Kamil Gliński

## Koncepcja Systemu:

Cel projektu: Wykonanie aplikacji sklepu internetowego w architekturze rozproszonej.

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

## Analiza Wymagań

**Wymagania funkcjonalne:**
System umożliwia:
- rejestrację użytkowników
- autentykację użytkowników
- manipulacje danymi produktów
- zarządzanie promocjami
- kupno produktu oraz ewentualną reklamację po zakupie
- opublikowanie opinii o usługach sklepu
- kontakt ze sprzedawcą za pomocą formularza

**Wymagania niefunkcjonalne:**
Stabilność systemu, Odporność na błędy, Przenośność kodu, Czystość kodu, Jakość kodu, Optymalizacja

**Use cases:**

Rejestr zamówień:
![](./pictures/REJESTR_ZAMOWIEN.png)

Rejestr produktów:
![](./pictures/REJESTR_PRODUKTOW.png)

Diagramy klas: TODO_GDY_KOD_BEDZIE_GOTOWY

Diagramy komponentów: TODO_GDY_KOD_BEDZIE_GOTOWY

Diagramy sekwencji: TODO_GDY_KOD_BEDZIE_GOTOWY

Struktura danych: TODO_GDY_KOD_BEDZIE_GOTOWY

**Planowane Testy:**
Funkcjonalne, E2E
