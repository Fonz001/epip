var user = "bits-donatello";









function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(tab);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}


function loadDoc(url,callback)
{
  var x = new XMLHttpRequest();
  x.open('GET', url);

  //x.send(JSON.stringify(data));

  x.responseType = 'json';
  x.onload = function() {
    callback(x.response);
  };
  x.onerror = function() {
    renderStatus(x.status);
  };
  x.send();
}


function send_tap(e)
{
  command = document.getElementById('command').value;
  //user='user';

  //if(!user) document.getElementById("user").className = '';



  //e = e || window.event;
  //var target = e.target || e.srcElement,
  //slack = target.textContent || text.innerText;

  var list = document.getElementById("list");
  var slack = list.options[list.selectedIndex].text;

  document.getElementById('command').value = '';
  getCurrentTabUrl(function(tab) {
    loadDoc('http://vps1483.directvps.nl/share?url='+encodeURIComponent(tab.url)+'&title='+encodeURIComponent(tab.title)+'&comment='+encodeURIComponent(command)+'&slack='+encodeURIComponent(slack)+'&user='+encodeURIComponent(user),save_tab);
  
    document.getElementById("done").className = 'show';
  });
}



document.addEventListener('DOMContentLoaded', function() {
  loadDoc('http://epip.nl/slack_list.php',create_list);
});

function set_user()
{
  var list = document.getElementById("user");
  user = list.options[list.selectedIndex].text;

  document.getElementById("user").className = 'hidden';
}
  
function create_list(data)
{
  for (i = 0; i < data.length; ++i) {
    add_to_list(data[i]);
  }
}

function save_tab(data)
{
 renderStatus(data.url+'\n'+data.title+'\n'+data.comment+'\n'+data.slack+'\n'+data.user);
}

function add_to_list(item){
  var entry = document.createElement('option');
  entry.appendChild(document.createTextNode(item));
  document.getElementById("list").appendChild(entry);


  //var entry2 = document.createElement('option');
 // entry2.appendChild(document.createTextNode(item));
  //if(!item.match(/\#/))  document.getElementById("user").appendChild(entry2);

}

//document.getElementById("user").addEventListener("change", set_user);
document.getElementById("share").addEventListener("click", send_tap);



//local.funcolors.nl?

//url: "http://example.xxx",
//title: "Title van de pagina (aanpasbaar?)",
//comment: "Kijk eens wat een goed pagina!",
//slack: "#bits-please" || "@bits-leonardo", // general default
//user: "@bits-donatello"

