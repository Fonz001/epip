# Epip
Get enlightened!

# Server endpoints:

* `/share`:
    * _description_: Creates a new share item
    * _fields_: 
        * url: "http://example.xxx",
        * description: "Korte samenvatting pagina",
        * title: "Title van de pagina (aanpasbaar?)",
        * comment: "Kijk eens wat een goed pagina!",
        * slack: "#bits-please" || "@bits-leonardo", // general default
        * user: "@bits-donatello"
* `/get?user=bits-donatello`:
    * _description_: Gets a random shared item (nodig: channels waar user in zit).
    * _result_: 
        * url: string;
        * description: string;
        * title: string;
        * comment: string;
        * slack: string;
        * createdAt: date;
        * viewedAt: date (optional?);

* `/slack?code=xxx`:
    * _description_: Redirect URI after slack login


Datamodel:
* url: string;
* description: string;
* title: string;
* comment: string;
* slack: string;
* createdAt: date;
* viewedAt: date (optional?);