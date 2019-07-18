import Component from '@ember/component';
import JSONFormatter from 'json-formatter-js'

export default Component.extend({

  // Element
  classNames: ['json-explorer'],

  // Props
  value: null,

  didInsertElement(){
    this._super(...arguments);
    this.renderFormattedJson();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.renderFormattedJson();
  },

  renderFormattedJson() {

    let $jsonFormatter = this.element.querySelector('.json-formatter');
    if ($jsonFormatter) {
      this.element.removeChild($jsonFormatter);
    }

    $jsonFormatter = document.createElement('div');
    $jsonFormatter.setAttribute('class', 'json-formatter');

    const formatter = new JSONFormatter(this.value, 1, { hoverPreviewEnabled: true });
    let html = formatter.render();
    $jsonFormatter.appendChild(html);

    this.element.appendChild($jsonFormatter);
  }

});
