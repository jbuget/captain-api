import isSimpleRequest from 'pixman/utils/is-simple-request';
import { module, test } from 'qunit';
import {
  Headers as HttpHeaders,
  Request as HttpRequest
} from 'fetch';

/**
 * Cf. https://medium.com/@f2004392/cors-preflight-request-options-9d05b9248e5a
 */
module.only('Unit | Utility | is-simple-request', function() {

  module('when request has no special setup but method', function() {

    ['GET', 'POST', 'HEAD'].forEach(function(method) {

      test(`should return true when request method is ${method}`, function(assert) {
        // given
        const httpRequest = new HttpRequest('http://some.url', { method });

        // when
        let result = isSimpleRequest(httpRequest);

        // then
        assert.equal(result, true);
      });
    });

    ['PUT', 'PATCH', 'DELETE'].forEach(function(method) {

      test(`should return true when request method is ${method}`, function(assert) {
        // given
        const httpRequest = new HttpRequest('http://some.url', { method });

        // when
        let result = isSimpleRequest(httpRequest);

        // then
        assert.equal(result, false);
      });
    });
  });

  module('when request has simple method and manually set headers', function() {

    ['Accept', 'Accept-Language', 'Content-Language', 'Content-Type'].forEach(function(header) {

      test(`should return true when request headers contains ${header}`, function(assert) {
        // given
        const httpHeaders = new HttpHeaders();
        if (header === 'Content-Type') {
          httpHeaders.append(header, 'text/plain');
        } else {
          httpHeaders.append(header, 'some value');
        }
        const httpRequest = new HttpRequest('http://some.url', { method: 'GET', headers: httpHeaders });

        // when
        let result = isSimpleRequest(httpRequest);

        // then
        assert.equal(result, true);
      });
    });

    ['Authorization', 'Cache-Control', 'Keep-Alive', 'Pragma'].forEach(function(header) {

      test(`should return true when request headers contains ${header}`, function(assert) {
        // given
        const httpHeaders = new HttpHeaders();
        httpHeaders.append(header, 'some value');
        const httpRequest = new HttpRequest('http://some.url', { method: 'GET', headers: httpHeaders });

        // when
        let result = isSimpleRequest(httpRequest);

        // then
        assert.equal(result, false);
      });
    });
  });

  module('when request has simple method and headers and manually set content-type', function() {

    ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'].forEach(function(contentType) {

      test(`should return true when request content-type is ${contentType}`, function(assert) {
        // given
        const httpHeaders = new HttpHeaders();
        httpHeaders.append('Content-Type', contentType);
        const httpRequest = new HttpRequest('http://some.url', { method: 'GET', headers: httpHeaders });

        // when
        let result = isSimpleRequest(httpRequest);

        // then
        assert.equal(result, true);
      });
    });

    ['application/json', 'application/octet-stream', 'text/html', 'text/css', 'image/jpeg'].forEach(function(contentType) {

      test(`should return true when request content-type is ${contentType}`, function(assert) {
        // given
        const httpHeaders = new HttpHeaders();
        httpHeaders.append('Content-Type', contentType);
        const httpRequest = new HttpRequest('http://some.url', { method: 'GET', headers: httpHeaders });

        // when
        let result = isSimpleRequest(httpRequest);

        // then
        assert.equal(result, false);
      });
    });
  })

});
