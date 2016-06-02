import { select } from 'd3-selection';

export default class Panel {
  constructor() {
    this.build();
  }

  build() {
    this.outer = select(document.createElement('div'))
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
        'position': 'relative',
        'width': '100%'
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
        'white-space': 'nowrap',
        'width': '40%',
        'text-align': 'center',
        'text-overflow': 'ellipsis'
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
        'position': 'relative',
        'width': '100%'
      });

    this.footerTitle = this.footer
      .append('div')
      .classed('scola title', true)
      .styles({
        'font-weight': 'bold',
        'line-height': '3em',
        'position': 'absolute',
        'text-align': 'center',
        'width': '100%'
      });
  }

  destroy() {
    this.outer.remove();
  }

  node() {
    return this.outer.node();
  }
}
