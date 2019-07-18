import EmberObject from '@ember/object';
import { saveAs } from 'file-saver';

export default EmberObject.extend({

  httpResponse: null, // FetchAPI#Response
  duration: null,

  url: null,
  status: null,
  statusText: null,
  headers: null,

  async init() {
    this._super(...arguments);

    if (!this.httpResponse) {
      throw new Error('Property "httpResponse" is required.');
    }

    if (!this.duration) {
      throw new Error('Property "duration" is required.');
    }

    const status = {
      code: this.httpResponse.status,
      text: this.httpResponse.statusText
    };
    if (!this.httpResponse.ok && this.httpResponse.status === 0) {
      status.code = 404;
      status.text = 'Resource not found';
    }

    const headers = Object.keys(this.httpResponse.headers.map).reduce((h, key) => {
      h.push({ name: key, value: this.httpResponse.headers.map[key] });
      return h;
    }, []);

    let bodyPreview;
    if (this.httpResponse.headers.has('content-type') && this.httpResponse.headers.get('content-type').includes('application/json')) {
      bodyPreview = await this.httpResponse.json();
    }

    let bodyRaw;
    if (this.httpResponse.headers.has('content-type') && this.httpResponse.headers.get('content-type').includes('octet-stream')) {
      const responseBodyBlob = await this.httpResponse.blob();
      saveAs(responseBodyBlob, 'file');
      bodyRaw = 'A file should have been downloaded on your computer.';
    } else {
      bodyRaw = JSON.stringify(bodyPreview);
    }

    this.setProperties({
      url: this.httpResponse.url,
      status: status.code,
      statusText: status.text,
      headers,
      bodyPreview,
      bodyRaw,
    });
  }

});
