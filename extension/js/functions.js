// VARS
var setUrl = 'http://epip.nl/api/set/';
var getUrl = 'http://epip.nl/api/get/';

// HELPERS
function set_data(data, callback)
{
    get_local_stored_user_id( function(creatorId) {
        data.creatorId = creatorId;
        $.get(setUrl, data, function(data) { callback(data); }, 'json');
    });
}

function get_data(callback, data)
{
    if(!data) {
        data = {};
    }
    get_local_stored_user_id( function(creatorId) {
        data.creatorId = creatorId;
        $.get(getUrl, data, function(data) { callback(data); }, 'json');
    });
}

function get_current_tab(callback)
{
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, function(tabs) {
        callback(tabs[0]);
    });
}

function get_local_stored_user_id(callback)
{
    chrome.storage.local.get('userId', function(obj) {
        if (obj.userId) {
            callback(obj.userId);
        } else {
            var r = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            var userId = (r()+r()+r()+r()+r()+r()+r()+r());

            // SAVE USER ID
            chrome.storage.local.set({'userId': userId});
            callback(userId);
        }
    });
}
