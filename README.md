# dt162g_project_admin administrations webbapplikation, React + TypeScript + Vite

Repository för administrativ webbapplikatin för projekt

Skapat av Erika Vestin, 2024

Webbutvecklingsprogrammet, Miun Sundsvall

Kurs: DT162G - JavaScriptbaserad Webbutveckling

## Om applikationen 
Applikationen är en administrativ webbapplikation för ett fiktivt café vid namn CoffeCake Café. För att kunna komma åt administationsgränssnittet behöver du skapa användare och logga in med mejladress och lösenord. 
Caféet använder applikationen för att hämta, lägga till, ändra och radera data som de presenterar på sin publika webbplats. De data hanteras är data för deras meny och att skapa nya användare till administrationsgränssnittet. Menyn och användare till gränssnittet lagras i en REST-webbtjänst.

Webbapplikationen har skapast med hjälp av frontend-ramverket React som har installerats med Vite. CSS är skapad med CSS-ramverket Bootstrap och minimalt med egenskriven CSS-kod. All kod är skriven i TypeScript och JSX och är komponentbaserad. Det finns komponenter för header, footer, navigering, att lägga till data i menyn, hämta och ändra och radera data i menyn, lägga till användare och logga in användare. 

## API som konsumeras

Den del av webbtjänsten som hanterar menyn har full CRUD-funktionalitet, dock är POST, PUT och DELETE av menyn i webbtjänsten skyddade med autentisering via token.

Delen som hanterar användare har funktionalitet för GET och POST. 

Login har enbart POST-funktionalitet som används enbart vid inloggning.

API:t är skapat med Node.js, ramverket Express och några installerade NPM-paket. Data från webbtjänsten lagras i en NoSQL-databas, MongoDB.

Kommunikation mellan API:t och applikationen sker med hjälpa av Ajax-anrop med metoden Fetch. Data hämtas och skickas från och till API:t i JSON-format.

### Autentisering
Autentisering sker med hjälp av token som skapas när en registerad användare loggar in i gränssnittet med korrekt mejladress och lösenord. Den token som genereras vid inloggning returneras i JSON-format och sparas i localstorage i webbläsaren. När en användare loggar ut rensas localstorage och användaren behöver logga in igen, få en ny token för att komma åt gränssnittet.

Token returneras även vid inloggning direkt via webbtjänsten. Token behöver skickas med i headers som Authorization.

Collection users och login är öppna och skyddas inte av token.

## Endpoints och användning

### Menu
Metod Ändpunkt Beskrivning

GET /menu Hämtar alla poster i menyn

GET /menu/id Hämtar en specifik post från menyn med hjälp av angivet ID.

POST /menu Lagrar ny data i menyn. Kräver att ett menu-objekt skickas med. Token (fås vid inloggning av användare) behöver skickas med via Headers, Authorization.

PUT /menu/id Uppdaterar en existerande post i menyn med angivet ID. Kräver att ett menu-objekt skickas med. Token (fås vid inloggning av användare) behöver skickas med via Headers, Authorization.

DELETE /menu/id Raderar en post från menyn med hjälp av angivet ID. Token (fås vid inloggning av användare) behöver skickas med via Headers, Authorization.

### Users
Metod Ändpunkt Beskrivning

GET /users Hämtar alla användare

GET /users/id Hämtar en specifik användare med hjälp av angivet ID.

POST /users Lagrar ny användare. Kräver att ett users-objekt skickas med.

### Login
Metod Ändpunkt Beskrivning

POST /login Loggar in användare. Kräver att ett users-objekt skickas med.


## Format på objekt

### Menu
{

"_id": "65900ddf931ba946be6a2744",

"name": "Kanelbulle",

"description": "Vetebulle med kanel, socker, kardemumma, pärlsocker",

"category": "Frukost",

"price": "25kr",

"__v": 0
}

### Users
{

"_id": "659034262fac72c1254072f0",

"email": "e@outlook.com",

"password": "$2b$10$/EJUOvZoj8KbhhlX9SH9uemgxf5HtrSj30Xghh4Zi8TqZ0tRzJpWW",

"name": "Erika Vestin",

"__v": 0
}

### Login
{

"email": "mateo@outlook.com",

"password" : "password"
}

### Login - Format på Token dom returneras när inloggning lyckas för en användare
{

"message": "Välkommen",

"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTAzNmNkNDRiYzdkZjhiODMzZDNlOSIsImlhdCI6MTcwNDIwMzQzM30._figTzpc4OPHvf6v9u44F_BLjDitIEjoNJZ82IuF1qE"

}



