# simple-get-post

[![Build Status](https://travis-ci.org/davidcole1977/simple-get-post.svg)](https://travis-ci.org/davidcole1977/simple-get-post)

A simple helper module to get JSON data from, or post data to, a URL end point

## Set up

coming soon...

## Basic useage

```shell
function callback (error, data) {
  if (error) {
    throw error;
  } else {
    console.log(data);
  }
}

var get = require('simple-get-post').get,
    requestDetails = {
      url: 'http://requestURL.com/',
      params: {
        foo: 'bar'
      },
      callback: callback
    };

get(requestDetails);
```

## API

coming soon...

## Development

coming soon...

## Known issues

coming soon...

## Release history

### 0.1.0
* Added get() method