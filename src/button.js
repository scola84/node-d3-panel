import { select } from 'd3-selection';

export default class PanelButton {
  constructor() {
    this._text = null;
    this._textPadding = null;
    this._icon = null;
    this._iconPadding = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola button', true)
      .styles({
        'align-items': 'center',
        'background': 'none',
        'border': 0,
        'cursor': 'pointer',
        'display': 'flex',
        'height': '3em',
        'justify-content': 'center',
        'padding': 0
      });

    this._padding = this._root
      .append('div')
      .classed('scola padding', true)
      .styles({
        'height': '100%',
        'order': 1,
        'width': '1em'
      });
  }

  destroy() {
    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  icon(name) {
    if (typeof name === 'undefined') {
      return this._icon;
    }

    if (name === false) {
      this._icon.remove();
      this._icon = null;

      this._iconPadding.remove();
      this._iconPadding = null;

      return this;
    }

    this._icon = this._root
      .append('div')
      .classed('scola icon', true)
      .classed(name, true)
      .styles({
        'font-size': '2em',
        'order': 2
      });

    this._iconPadding = this._root
      .append('div')
      .classed('scola padding', true)
      .styles({
        'height': '100%',
        'order': 3,
        'width': '0.5em'
      });

    return this;
  }

  text(text) {
    if (typeof text === 'undefined') {
      return this._text;
    }

    if (text === false) {
      this._text.remove();
      this._text = null;

      return this;
    }

    this._text = this._root
      .append('div')
      .classed('scola text', true)
      .styles({
        'order': 4,
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      })
      .text(text);

    return this;
  }

  center() {
    this._root.styles({
      'display': 'inline-flex',
      'flex-direction': 'row'
    });

    if (!this._icon) {
      this._padding.style('display', 'none');
    }

    return this;
  }

  left() {
    this._root.styles({
      'flex-direction': 'row'
    });

    return this;
  }

  right() {
    this._root.styles({
      'flex-direction': 'row-reverse'
    });

    return this;
  }
}
