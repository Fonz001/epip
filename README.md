# Epip

Get enlightened!

# New version

The v1.1 version is based on the initial release after te hackthon.
It currently features a simple sharing system with every registered user.
The idea is to properly rebuild the hackathon prototype and take it from there.

Team Epiphany

### Todo

* Move gravatar `md5()` generation from client to server + check if image exists
* Move screenshot generation to the server + avoid screenshotlayer API for images and youtube video's
* Add group functionality
    * Group field in profile form
    * Button to share with everyone in the group
    * Limit user share list to users from your group
* Add friend functionality
    * New form to add friend via username or email
    * Limit the user share list to friends and groups

# Old documentation

### Server endpoints

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
