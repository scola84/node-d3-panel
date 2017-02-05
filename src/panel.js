import { select } from 'd3-selection';
import Resizer from 'element-resize-detector';
import debounce from 'lodash-es/debounce';
import { controlBar } from '@scola/d3-control';
import Message from './message';
import 'd3-selection-multi';

export default class Panel {
  constructor() {
    this._header = null;
    this._footer = null;
    this._lock = null;
    this._message = null;

    this._resizer = Resizer({
      callOnAdd: false
    });

    this._root = select('body')
      .append('form')
      .remove()
      .classed('scola panel', true)
      .attrs({
        'method': 'POST'
      })
      .styles({
        'display': 'flex',
        'flex-direction': 'column',
        'height': '100%',
        'position': 'absolute',
        'width': '100%'
      });

    this._body = this._root
      .append('div')
      .classed('scola body', true)
      .styles({
        'background': '#EEE',
        'flex': 1,
        'overflow': 'auto',
        'padding-top': '3em',
        'position': 'relative',
        '-webkit-overflow-scrolling': 'touch'
      });

    this._handleResize = debounce(() => this._resize(), 100);
    this._handleSubmit = (e) => this._submit(e);

    this._bindRoot();
    this._bindResizer();
  }

  destroy() {
    this._unbindRoot();
    this._unbindResizer();

    this._deleteHeader();
    this._deleteFooter();
    this._deleteMessage();

    this._handleResize.cancel();
    this._handleResize = null;

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  body() {
    return this._body;
  }

  header(action = true) {
    if (action === false) {
      return this._deleteHeader();
    }

    if (!this._header) {
      this._insertHeader();
    }

    return this._header;
  }

  footer(action = true) {
    if (action === false) {
      return this._deleteFooter();
    }

    if (!this._footer) {
      this._insertFooter();
    }

    return this._footer;
  }

  lock(value) {
    if (value === false) {
      return this._deleteLock();
    }

    if (!this._lock) {
      this._insertLock();
    }

    return this._lock;
  }

  message(value = null) {
    if (value === null) {
      return this._message;
    }

    if (value === false) {
      return this._deleteMessage();
    }

    if (this._message) {
      return this._updateMessage(value);
    }

    return this._insertMessage(value);
  }

  append(child, action = true) {
    if (action === false) {
      return this._deleteChild(child);
    }

    return this._insertChild(child);
  }

  _bindRoot() {
    this._root.node().addEventListener('submit', this._handleSubmit);
  }

  _unbindRoot() {
    this._root.node().removeEventListener('submit', this._handleSubmit);
  }

  _unbindResizer() {
    this._resizer.uninstall(this._root.node());
  }

  _bindResizer() {
    this._resizer.listenTo(this._root.node(), this._handleResize);
  }

  _resize() {
    this._root.dispatch('resize');
  }

  _submit(event) {
    event.preventDefault();
  }

  _insertHeader() {
    this._header = controlBar();

    this._header.root()
      .classed('header', true)
      .styles({
        'border-bottom': '1px solid #CCC'
      });

    this._root.node()
      .insertBefore(this._header.root().node(), this._body.node());

    return this;
  }

  _deleteHeader() {
    if (this._header) {
      this._header.destroy();
      this._header = null;
    }

    return this;
  }

  _insertFooter() {
    this._footer = controlBar();

    this._footer.root()
      .classed('footer', true)
      .styles({
        'border-top': '1px solid #CCC'
      });

    this._root.node()
      .appendChild(this._footer.root().node());

    return this;
  }

  _deleteFooter() {
    if (this._footer) {
      this._footer.destroy();
      this._footer = null;
    }

    return this;
  }

  _insertLock() {
    this._lock = this._root
      .append('div')
      .classed('scola lock', true)
      .styles({
        'bottom': 0,
        'left': 0,
        'position': 'absolute',
        'right': 0,
        'top': 0
      });

    return this;
  }

  _deleteLock() {
    if (this._lock) {
      this._lock.remove();
      this._lock = null;
    }

    return this;
  }

  _insertMessage(text) {
    this._body.style('overflow', 'hidden');
    this._message = new Message().text(text);
    this.append(this._message);

    return this;
  }

  _updateMessage(text) {
    this._message.text(text);
    return this;
  }

  _deleteMessage() {
    if (this._message) {
      this.append(this._message, false);
      this._message = null;
      this._body.style('overflow', 'auto');
    }

    return this;
  }

  _insertChild(child) {
    this._body.node()
      .appendChild(child.root().node());

    return child;
  }

  _deleteChild(child) {
    child.root().remove();
    return child;
  }
}
