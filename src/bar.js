import { select } from 'd3-selection';

export default class Bar {
  constructor() {
    this._root = select('body')
      .append('div')
      .classed('scola', true)
      .styles({
        'background': '#FAFAFA',
        'display': 'flex',
        'height': '3em',
        'justify-content': 'space-between',
        'padding': '0 0.5em',
        'position': 'relative',
        'width': '100%'
      });

    this._left = this._root
      .append('div')
      .classed('scola left', true)
      .styles({
        'display': 'flex',
        'flex-direction': 'row',
        'width': '30%'
      });

    this._title = this._root
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

    this._right = this._root
      .append('div')
      .classed('scola right', true)
      .styles({
        'display': 'flex',
        'flex-direction': 'row-reverse',
        'width': '30%'
      });
  }

  destroy() {
    this._root.remove();
  }

  root() {
    return this._root;
  }

  left(element) {
    if (typeof element === 'undefined') {
      return this._left;
    }

    this._left.node().appendChild(element.root().node());
    return this;
  }

  right(element) {
    if (typeof element === 'undefined') {
      return this._right;
    }

    this._right.node().appendChild(element.root().node());
    return this;
  }

  title(text) {
    if (typeof text === 'undefined') {
      return this._title;
    }

    this._title.text(text);
    return this;
  }
}
