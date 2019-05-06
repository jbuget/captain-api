/**
 * Cf. https://medium.com/@f2004392/cors-preflight-request-options-9d05b9248e5a
 * Cf. https://fetch.spec.whatwg.org/#no-cors-safelisted-request-header-name
 * Cf. https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */

export default function isSimpleRequest(httpRequest) {

  if (!['GET', 'POST', 'HEAD'].includes(httpRequest.method)) {
    return false;
  }

  const httpHeaders = httpRequest.headers;

  if (!httpHeaders) {
    return true;
  }

  const preflightHeaders = [];
  for (let [key] of httpHeaders.entries()) {
    if (!['accept', 'accept-language', 'content-language', 'content-type'].includes(key)) {
      preflightHeaders.push(key);
    }
  }
  if (preflightHeaders.length > 0) {
    return false;
  }

  if (httpHeaders.has('content-type')) {
    if (!['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'].includes(httpHeaders.get('content-type'))) {
      return false;
    }
  }

  return true;
}
