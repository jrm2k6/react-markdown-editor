var MarkdownEditorActions = require('../actions/MarkdownEditorActions');
var Reflux = require('reflux');

var _timerClick;
var _canClear = true;

var TextAreaSelectionMixin = {
    mixins: [Reflux.ListenerMixin],

    bindSelectEvent: function() {
        if (this.refs.editor != null) {
            this.textAreaElem = this.refs.editor.getDOMNode();
            this.textAreaElem.addEventListener("select", this.onSelectHandler);
            this.textAreaElem.addEventListener("click", this.clearSelection);
        }
    },

    clearSelection: function() {
        if (canClear) {
            MarkdownEditorActions.clearSelection();
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

    onSelectHandler: function(e) {
        var _eventSource = this._getEventSource(e);
        var _selectionStart = _eventSource.selectionStart;
        var _selectionEnd = _eventSource.selectionEnd;
        var _selectedText = _eventSource.value.slice(_selectionStart, _selectionEnd);

        var selection = {
            selectionStart: _selectionStart,
            selectionEnd: _selectionEnd,
            selectedText: _selectedText
        }

        MarkdownEditorActions.setSelection(selection);
        this._preventClearSelectionAfterSelectIfNeeded(e);
    },

    unbindSelectEvent: function() {
        this.textAreaElem.removeEventListener("select", this.onSelectHandler);
        this.textAreaElem.removeEventListener("click", this.clearSelection);
    },

    componentWillUnmount: function() {
        this.unbindSelectEvent();
    },

    _getEventSource: function(e) {
        return e.srcElement || e.target;
    },

    _preventClearSelectionAfterSelectIfNeeded: function(e) {
        if (e.target !== null) {
            canClear = false;
            _timerClick = setTimeout(function() {
                canClear = true;
                _timerClick = null;
            }, 100);
        }
    }
}

module.exports = TextAreaSelectionMixin;