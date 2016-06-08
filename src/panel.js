import { select } from 'd3-selection';

export default class Panel {
  constructor() {
    this.build();
  }

  build() {
    this.outer = select('body')
      .append('div')
      .classed('scola panel', true)
      .styles({
        'background': '#EEE',
        'display': 'flex',
        'flex-direction': 'column',
        'height': '100%',
        'position': 'absolute',
        'width': '100%'
      });

    this.header = this.outer
      .append('div')
      .classed('scola header', true)
      .styles({
        'background': '#FAFAFA',
        'border-bottom': '1px solid #CCC',
        'display': 'flex',
        'height': '3em',
        'justify-content': 'space-between',
        'padding': '0 0.5em',
        'position': 'relative',
        'width': '100%'
      });

    this.headerLeft = this.header
      .append('div')
      .classed('scola left', true)
      .styles({
        'display': 'flex',
        'flex-direction': 'row',
        'width': '30%'
      });

    this.headerTitle = this.header
      .append('div')
      .classed('scola title', true)
      .styles({
        'font-weight': 'bold',
        'left': '30%',
        'line-height': '3em',
        'overflow': 'hidden',
        'position': 'absolute',
        'text-align': 'center',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        'width': '40%'
      });

    this.headerRight = this.header
      .append('div')
      .classed('scola right', true)
      .styles({
        'display': 'flex',
        'flex-direction': 'row-reverse',
        'width': '30%'
      });

    this.body = this.outer
      .append('div')
      .classed('scola body', true)
      .styles({
        'flex-grow': 1,
        'overflow-x': 'hidden',
        'overflow-y': 'auto',
        'position': 'relative',
        '-webkit-overflow-scrolling': 'touch',
        'width': '100%'
      });

    this.footer = this.outer
      .append('div')
      .classed('scola footer', true)
      .styles({
        'background': '#FAFAFA',
        'border-top': '1px solid #CCC',
        'display': 'none',
        'height': '3em',
        'justify-content': 'space-between',
        'position': 'relative',
        'width': '100%'
      });

    this.footerLeft = this.footer
      .append('div')
      .classed('scola left', true)
      .styles({
        'display': 'flex',
        'flex-direction': 'row',
        'width': '30%'
      });

    this.footerTitle = this.footer
      .append('div')
      .classed('scola title', true)
      .styles({
        'font-weight': 'bold',
        'left': '30%',
        'line-height': '3em',
        'overflow': 'hidden',
        'position': 'absolute',
        'text-align': 'center',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        'width': '40%'
      });

    this.footerRight = this.footer
      .append('div')
      .classed('scola right', true)
      .styles({
        'display': 'flex',
        'flex-direction': 'row-reverse',
        'width': '30%'
      });
  }

  destroy() {
    this.outer.remove();
  }

  node() {
    return this.outer.node();
  }
}
