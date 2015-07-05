module.exports = (function () {

  function getQueryString (params) {
    var keys = Object.keys(params),
        keyValuePairs = [];

    keyValuePairs = keys.map(function(key) {
      return key + '=' + params[key];
    });

    return encodeURI('?' + keyValuePairs.join('&'));
  }

  function get (args) {
    var queryString = args.params ? getQueryString(args.params) : '',
        request = new XMLHttpRequest();

    request.timeout = 5000;
    request.open('GET', args.url + queryString, true);

    request.onload = function() {
      // if successful
      if (request.status < 400) {
        args.callback(null, JSON.parse(request.responseText));
      } else {
        args.callback(new Error('Could not complete the request due to server error' + request.status + ': ' + request.statusText));
      }
    };

    request.onerror = function() {
      args.callback(new Error('A connection error prevented the request from being processed'));
    };

    request.ontimeout = function () {
      args.callback(new Error('Request timed out'));
    };

    request.send();
  }

  return {
    get: get,

    TEST: {
      getQueryString: getQueryString
    }
  };

})();
