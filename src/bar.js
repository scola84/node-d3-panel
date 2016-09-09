import { select } from 'd3-selection';

export default class PanelBar {
  constructor() {
    this._title = null;
    this._left = null;
    this._right = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola', true)
      .styles({
        'background': '#FAFAFA',
        'display': 'flex',
        'height': '3em',
        'justify-content': 'space-between',
        'line-height': '3em',
        'padding': '0 0.5em'
      });

    this._center = this._root
      .append('div')
      .classed('scola center', true)
      .styles({
        'display': 'flex',
        'flex': 1,
        'flex-direction': 'row',
        'justify-content': 'center',
        'order': 2,
        'overflow': 'hidden'
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

  center(element, action) {
    if (action === true) {
      this._center.node().appendChild(element.root().node());
    } else if (action === false) {
      element.root().remove();
    }

    return this;
  }

  left(element, action) {
    if (!this._left) {
      this._sides();
    }

    if (action === true) {
      this._left.node().appendChild(element.root().node());
    } else if (action === false) {
      element.root().remove();
    }

    return this;
  }

  right(element, action) {
    if (!this._right) {
      this._sides();
    }

    if (action === true) {
      this._right.node().appendChild(element.root().node());
    } else if (action === false) {
      element.root().remove();
    }

    return this;
  }

  title(value) {
    if (typeof value === 'undefined') {
      if (!this._title) {
        this._insertTitle();
      }

      return this._title;
    }

    if (value === false) {
      return this._deleteTitle();
    }

    if (this._title) {
      return this._updateTitle(value);
    }

    return this._insertTitle(value);
  }

  _insertTitle(title) {
    this._title = this._center
      .append('div')
      .classed('scola title', true)
      .styles({
        'font-weight': 'bold',
        'overflow': 'hidden',
        'text-align': 'center',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
      })
      .text(title);

    return this;
  }

  _updateTitle(title) {
    this._title.text(title);
    return this;
  }

  _deleteTitle() {
    if (this._title) {
      this._title.remove();
      this._title = null;
    }

    return this;
  }

  _sides() {
    this._left = this._root
      .append('div')
      .classed('scola left', true)
      .styles({
        'display': 'flex',
        'flex-basis': '30%',
        'flex-direction': 'row',
        'order': 1
      });

    this._right = this._root
      .append('div')
      .classed('scola right', true)
      .styles({
        'display': 'flex',
        'flex-basis': '30%',
        'flex-direction': 'row-reverse',
        'order': 3
      });
  }
}
