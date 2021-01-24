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
Funkcjonalne

**Przypadki testowe:**
GDY: poprawne dane autentykacji || AKCJA:autentykacja || REZULTAT:użytkownik zalogowany  
![](./pictures/test-case03.png)
GDY: niepoprawne dane autentykacji || AKCJA:autentykacja || REZULTAT:użytkownik niezalogowany
![](./pictures/test-case02.png)  


GDY:użytkownik niezalogowany || AKCJA:pobranie listy produktów || REZULTAT:brak możliwości wyświetlenia produktów  
![](./pictures/test-case01.png)
GDY:użytkownik zalogowany || AKCJA:pobranie listy produktów || REZULTAT:wyświetlenie produktów
![](./pictures/test-case04.png)
  

GDY:użytkownik zalogowany, produkty w systemie || AKCJA:dodanie produktów do koszyka || REZULTAT:produkty w koszyku
![](./pictures/test-case05.png)  
GDY:użytkownik zalogowany, produkty w koszyku || AKCJA:usunięcie produktów z koszyka || REZULTAT:usunięcie produktów z koszyka
![](./pictures/test-case06.png)
  

GDY:użytkownik zalogowany, prawidlowe dane karty bankowej || AKCJA:zaakceptowanie płatności || REZULTAT:zmiana statusu na 'zaakceptowano platnosc'
![](./pictures/instrukcja08.png)  
GDY:użytkownik zalogowany, nieprawidlowe dane karty bankowej || AKCJA:zaakceptowanie płatności || REZULTAT:brak zmiany statusu płatnosci
![](./pictures/test-case07.png)  

GDY:użytkownik zalogowany, prawidłowe dane karty bankowej, prawidłowe dane adresowe || AKCJA:wprowadzenie danych || REZULTAT:możliwość zatwierdzenia zamówienia
![](./pictures/instrukcja08.png)  
GDY:użytkownik zalogowany, nieprawidłowe dane karty bankowej, nieprawidłowe dane adresowe || AKCJA:wprowadzenie danych || REZULTAT:brak możliwości zatwierdzenia zamówienia
![](./pictures/test-case07.png)
  

GDY:użytkownik zalogowany, zatwierdzenie zamówienia || AKCJA:zatwierdzenie zamówienia || REZULTAT:utworzenie zamówienia, zapłacenie, utrwalenie danych adresowych
![](./pictures/instrukcja09.png)  

GDY:użytkownik zalogowany, zamówienie w systemie || AKCJA:reklamacja zamówienia || REZULTAT:zamówienie w stanie 'Zareklamowany'
![](./pictures/instrukcja10.png)  

GDY:administator zalogowany, poprawne dane produktu || AKCJA:utworzenie nowego produktu || REZULTAT:nowy produkt w systemie
![](./pictures/instrukcja11.png)  
GDY:administator zalogowany, niepoprawne dane produktu || AKCJA:utworzenie nowego produktu || REZULTAT:brak możliwości utworzenia produkt w systemie
![](./pictures/test-case08.png)

GDY:administator zalogowany, zamówienie w stanie 'Zapłacony' || AKCJA:Wyślij || REZULTAT:zmiana statusu na 'Wysłano'  
GDY:administator zalogowany, zamówienie w stanie innym niż 'Zapłacony' || AKCJA:Wyślij || REZULTAT:niemożliwość zmiany statusu
  

GDY:administator zalogowany, zamówienie w stanie 'Zareklamowany' || AKCJA:Zwrot || REZULTAT:zmiana statusu na 'Zwrócony'  
GDY:administator zalogowany, zamówienie w stanie innym niż 'Zareklamowany' || AKCJA:Zwrot || REZULTAT:niemożliwość zmiana statusu na 'Zwrócony'  


**Opis przeprowadzonych Testów:**
Przeprowadzone zostały testy funkcjonalne dowodzące temu że aplikacja zachowuje się prawidłowo, jak oczekiwano. Operacje wywoływane przez warstwę interfejsu użytkownika zmieniają stan encji na bazie danych, dane przechodzą z jednego walidnego stanu w drugi zgodnie z założeniami. Operacje zmiany stanu są odpowiednio chronione, dostep mają do nich tylko użytkownicy, którzy przeszli prawidłowo proces autentykacji. Zastosowana walidacja pól formularza na warstwie UI, spełnia założenia - zapobiega wprowadzaniu nieprawidłowych danych.




