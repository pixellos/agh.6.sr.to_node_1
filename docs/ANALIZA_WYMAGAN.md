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
