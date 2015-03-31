var MarkdownEditorActions = require('../actions/MarkdownEditorActions');
var Reflux = require('reflux');

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
        MarkdownEditorActions.clearSelection();
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
        var _selectionStart = e.srcElement.selectionStart;
        var _selectionEnd = e.srcElement.selectionEnd;
        var _selectedText = e.srcElement.value.slice(_selectionStart, _selectionEnd);

        var selection = {
            selectionStart: _selectionStart,
            selectionEnd: _selectionEnd,
            selectedText: _selectedText
        }

        MarkdownEditorActions.setSelection(selection);
    },

    unbindSelectEvent: function() {
        this.textAreaElem.removeEventListener("select", this.onSelectHandler);
        this.textAreaElem.removeEventListener("click", this.clearSelection);
    },

    componentWillUnmount: function() {
        this.unbindSelectEvent();
    }
}

module.exports = TextAreaSelectionMixin;