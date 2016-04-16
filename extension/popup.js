// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
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


function loadDoc(url,data)
{
  var x = new XMLHttpRequest();
  x.open('GET', url);

  //x.send(JSON.stringify(data));

  x.responseType = 'json';
  x.onload = function() {
    var response = x.response;
    renderStatus(response.url+'\n'+response.title+'\n'+response.comment+'\n'+response.slack+'\n'+response.user);
  };
  x.onerror = function() {
    renderStatus(x.status);
  };
  x.send();
}

function send_tap()
{
  getCurrentTabUrl(function(tab) {

    loadDoc('http://epip.nl/test.php?url='+JSON.stringify(tab.url)+'&title='+tab.title+'&comment='+'command'+'&slack='+'slack'+'&user='+'user');
  });
}

document.getElementById("share").addEventListener("click", send_tap);

document.addEventListener('DOMContentLoaded', function() {
 
});
  
    

//local.funcolors.nl?

//url: "http://example.xxx",
//title: "Title van de pagina (aanpasbaar?)",
//comment: "Kijk eens wat een goed pagina!",
//slack: "#bits-please" || "@bits-leonardo", // general default
//user: "@bits-donatello"

