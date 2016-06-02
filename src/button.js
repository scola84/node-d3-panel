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
        'flex-direction': 'row',
        'height': '3em',
        'width': '30%'
      });

    this.inner = this.outer
      .append('div')
      .classed('scola inner', true)
      .styles({
        'align-items': 'center',
        'cursor': 'pointer',
        'display': 'flex',
        'overflow': 'hidden'
      });

    this.padding = this.inner
      .append('div')
      .classed('scola padding', true)
      .styles({
        'width': '0.5em'
      });

    this.icon = this.inner
      .append('div')
      .classed('scola icon', true)
      .styles({
        'display': 'none',
        'font-size': '2em',
        'width': '0.6em'
      });

    this.text = this.inner
      .append('div')
      .classed('scola text', true)
      .styles({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      });
  }

  destroy() {
    this.outer.remove();
  }

  node() {
    return this.outer.node();
  }

  left() {
    this.outer.styles({
      'flex-direction': 'row',
      'order': 1
    });

    this.inner.styles({
      'flex-direction': 'row'
    });
  }

  right() {
    this.outer.styles({
      'flex-direction': 'row-reverse',
      'order': 3
    });

    this.inner.styles({
      'flex-direction': 'row-reverse'
    });
  }
}
