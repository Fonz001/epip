var setUrl = 'http://epip.nl/api/set/';
var getUrl = 'http://epip.nl/api/get/';

/**
 * Send user data to API.
 * @param {Object} data
 * @param {Function} callback
 */
function set_data(data, callback)
{
  get_local_stored_user_id(function(creatorId) {
    data.creatorId = creatorId;
    $.get(setUrl, data, function(response) { callback(response); }, 'json');
  });
}

/**
 * Get user data from API.
 * @param {Function} callback
 * @param {Object} [data]
 */
function get_data(callback, data)
{
  if (!data) {
    data = {};
  }
  get_local_stored_user_id(function(creatorId) {
    data.creatorId = creatorId;
    $.get(getUrl, data, function(response) { callback(response); }, 'json');
  });
}

/**
 * Get active tab info.
 * @param {Function} callback
 */
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

/**
 * Get user info.
 * @param {Function} callback
 */
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

      // save new user id
      chrome.storage.local.set({'userId': userId});
      callback(userId);
    }
  });
}

/**
 * Parse url to find YouTube video id.
 * @param {string} url
 * @returns {string|boolean}
 */
function parseYoutube(url) {
  var pattern = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  var match = url.match(pattern);
  return (match && match[1].length == 11) ? match[1] : false;
}
