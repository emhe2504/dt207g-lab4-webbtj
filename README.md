Länk till webbtjänsten:
https://dt207g-lab4-webbtj.onrender.com


Detta repo innehåller kod för den webbtjänst jag skapat för lab4 i kursen dt207g. Webbtjänsten presenterar både inloggningskonton samt gästboksinlägg (för en tillhörande Gästbokssida).


API:et använder databasen mongoDB. 


authenticationSchema föjer följande struktur:

email: String


password: String


created: Date





Här är länkar som kan användas för att nå användar-API:

    GET /api (alla användare i API)
    GET /api/id (specifik användare utifrån id)
    POST /api/register (lägger till användare i API. email och password-object måste skickas med i body)
    POST /api/login (loggar in användare och genererar token. email och password-object måste skickas med i body)
    PUT /api/id (uppdaterar redan existerande användare utifrån id. email och password-object måste skickas med i body)
    DELETE /api/id (raderar redan existerade användare utifrån id.)

    get, put och delete kräver Authorization: bearer token i header.






guestbookSchema föjer följande struktur:

title: String


thoughts: String


created: Date





Här är länkar som kan användas för att nå guestbook-API:

    GET /guestbook (alla guestbooks i API)
    GET /guestbook/id (specifik guestbook utifrån id)
    POST /guestbook (lägger till guestbook i API. title och thoughts-object måste skickas med i body)
    PUT /guestbook/id (uppdaterar redan existerande guestbook utifrån id. title och thoughts-object måste skickas med i body)
    DELETE /guestbook/id (raderar redan existerade guestbook utifrån id.)

    put och delete kräver Authorization: bearer token i header.
