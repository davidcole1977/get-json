module.exports = (function () {

  function makeQueryString (params) {
    var keys = Object.keys(params),
        keyValuePairs = [];

    keyValuePairs = keys.map(function(key) {
      return key + '=' + params[key];
    });

    return encodeURI('?' + keyValuePairs.join('&'));
  }

  function onLoad(request, callback) {
    // if successful
    if (request.status < 400) {
      callback(null, JSON.parse(request.responseText));
    } else {
      callback(new Error('Could not complete the request due to server error' + request.status + ': ' + request.statusText));
    }
  }

  function get (args) {
    var queryString = args.params ? makeQueryString(args.params) : '',
        request = new XMLHttpRequest();

    request.timeout = 5000;
    request.open('GET', args.url + queryString, true);

    request.onload = onLoad.bind(null, request, args.callback);
    request.onerror = args.callback.bind(null, new Error('A connection error prevented the request from being processed'));
    request.ontimeout = args.callback.bind(null, new Error('Request timed out'));

    request.send();
  }

  return {
    get: get,

    TEST: {
      makeQueryString: makeQueryString
    }
  };

})();
