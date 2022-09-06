'use strict';

exports.handler = async (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const uri = request.uri;
  const headers = request.headers;
  const host_header = headers.host[0].value;
  
  if (host_header === 'www.tristanpenman.com') {
    // redirect www to root domain
    const response = {
      status: '301',
      headers: {
        location: [{
          key: 'Location',
          value: 'https://tristanpenman.com' + uri
        }],
      }
    };

    return callback(null, response);

  } else if (uri === '/') {
    // redirect root requests to my blog
    const response = {
      status: '301',
      headers: {
        location: [{
          key: 'Location',
          value: 'https://tristanpenman.com/blog/'
        }],
      }
    };

    return callback(null, response);

  } else if (uri.endsWith('/')) {
    // with my jekyll config, canonical blog urls end with /
    // however content is in index.html, so we load it from there (no redirect)
    request.uri += 'index.html';
    return callback(null, request);

  } else if (uri.endsWith('/index.html')) {
    // redirect direct requests for index.html to canonical urls
    const response = {
      status: '301',
      headers: {
        location: [{
          key: 'Location',
          value: uri.slice(0, -10),
        }],
      }
    };

    return callback(null, response);

  } else if (uri.indexOf('.') > -1) {
    // regular files can be loaded with re-direct
    return callback(null, request);
    
  } else {
    // anything else that does not end with / should have it appended
    const response = {
      status: '301',
      headers: {
        location: [{
          key: 'Location',
          value: uri + '/',
        }],
      }
    };

    return callback(null, response);
  }
}
