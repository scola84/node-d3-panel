import { select } from 'd3-selection';

export default class Button {
  constructor() {
    this._root = select('body')
      .append('button')
      .classed('scola button', true)
      .styles({
        'background': 'none',
        'border': 0,
        'display': 'flex',
        'height': '3em',
        'justify-content': 'center',
        'padding': 0
      });

    this._inner = this._root
      .append('div')
      .classed('scola inner', true)
      .styles({
        'align-items': 'center',
        'cursor': 'pointer',
        'overflow': 'hidden'
      });

    this._padding = this._inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'height': '3em',
        'width': '0.5em'
      });

    this._icon = this._inner
      .append('div')
      .classed('scola icon', true)
      .styles({
        'display': 'none',
        'font-size': '2em'
      });

    this._iconPadding = this._inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'display': 'none',
        'height': '3em',
        'width': '0.5em'
      });

    this._text = this._inner
      .append('div')
      .classed('scola text', true)
      .styles({
        'display': 'none',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });

    this._textPadding = this._inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'display': 'none',
        'height': '3em',
        'width': '0.5em'
      });
  }

  destroy() {
    this._root.remove();
  }

  root() {
    return this._root;
  }

  icon(name) {
    if (typeof name === 'undefined') {
      return this._icon;
    }

    this._icon
      .style('display', 'flex')
      .classed(name, true);

    this._iconPadding
      .style('display', 'flex');

    return this;
  }

  text(text) {
    if (typeof text === 'undefined') {
      return this._text;
    }

    this._text
      .style('display', 'flex')
      .text(text);

    this._textPadding
      .style('display', 'flex');

    return this;
  }

  center() {
    this._inner.styles({
      'display': 'inline'
    });

    return this;
  }

  left() {
    this._root.styles({
      'flex-direction': 'row'
    });

    this._inner.styles({
      'display': 'flex',
      'flex-direction': 'row'
    });

    return this;
  }

  right() {
    this._root.styles({
      'flex-direction': 'row-reverse'
    });

    this._inner.styles({
      'display': 'flex',
      'flex-direction': 'row-reverse'
    });

    return this;
  }
}
