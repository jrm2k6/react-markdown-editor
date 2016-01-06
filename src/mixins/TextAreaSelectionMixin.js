var MarkdownEditorActions = require('../actions/MarkdownEditorActions');
var Reflux = require('reflux');

var _timerClick;
var _canClear = true;

var TextAreaSelectionMixin = {
  mixins: [Reflux.ListenerMixin],

  clearSelection: function() {
    if (_canClear) {
      MarkdownEditorActions.clearSelection();
    }
  },

  bindSelectEvent: function() {
    if (this.refs.editor !== null) {
      this.textAreaElem = this.refs.editor;
      this.textAreaElem.addEventListener('select', this.onSelectHandler);
    }
  },

  componentDidMount: function() {
    this.bindSelectEvent();
  },

  componentWillUpdate: function() {
    this.unbindSelectEvent();
  },

  componentDidUpdate: function() {
    this.bindSelectEvent();
  },

  unbindSelectEvent: function() {
    this.textAreaElem.removeEventListener('select', this.onSelectHandler);
  },

  componentWillUnmount: function() {
    this.unbindSelectEvent();
  },

  onSelectHandler: function(e) {
    var _eventSource = this._getEventSource(e);
    var _selectionStart = _eventSource.selectionStart;
    var _selectionEnd = _eventSource.selectionEnd;
    var _selectedText = _eventSource.value.slice(_selectionStart, _selectionEnd);

    var selection = {
      selectionStart: _selectionStart,
      selectionEnd: _selectionEnd,
      selectedText: _selectedText
    };

    MarkdownEditorActions.setSelection(selection);
    this._preventClearSelectionAfterSelectIfNeeded(e);
  },

  _getEventSource: function(e) {
    return e.srcElement || e.target;
  },

  _preventClearSelectionAfterSelectIfNeeded: function(e) {
    if (e.target !== null) {
      _canClear = false;
      _timerClick = setTimeout(function() {
        _canClear = true;
        _timerClick = null;
      }, 100);
    }
  }
};

module.exports = TextAreaSelectionMixin;
