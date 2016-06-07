import { select } from 'd3-selection';

export default class Button {
  constructor() {
    this.build();
  }

  build() {
    this.outer = select(document.createElement('div'))
      .classed('scola button', true)
      .styles({
        'display': 'flex',
        'height': '3em',
        'justify-content': 'center'
      });

    this.inner = this.outer
      .append('div')
      .classed('scola inner', true)
      .styles({
        'align-items': 'center',
        'cursor': 'pointer',
        'overflow': 'hidden'
      });

    this.outerPadding = this.inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'height': '3em',
        'width': '0.5em'
      });

    this._icon = this.inner
      .append('div')
      .classed('scola icon', true)
      .styles({
        'display': 'none',
        'font-size': '2em'
      });

    this.iconPadding = this.inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'display': 'none',
        'height': '3em',
        'width': '0.5em'
      });

    this._text = this.inner
      .append('div')
      .classed('scola text', true)
      .styles({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });

    this.textPadding = this.inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'height': '3em',
        'width': '0.5em'
      });

    this.left();
  }

  destroy() {
    this.outer.remove();
  }

  node() {
    return this.outer.node();
  }

  left() {
    this.outer.styles({
      'flex-direction': 'row'
    });

    this.inner.styles({
      'display': 'flex',
      'flex-direction': 'row'
    });

    return this;
  }

  center() {
    this.inner.styles({
      'display': 'inline'
    });

    return this;
  }

  right() {
    this.outer.styles({
      'flex-direction': 'row-reverse'
    });

    this.inner.styles({
      'display': 'flex',
      'flex-direction': 'row-reverse'
    });

    return this;
  }

  icon(name) {
    this._icon
      .style('display', 'flex')
      .classed(name, true);

    this.iconPadding
      .style('display', 'flex');

    return this;
  }

  text(text) {
    this._text.text(text);
    return this;
  }
}
