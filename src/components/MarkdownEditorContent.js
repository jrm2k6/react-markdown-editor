var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var PropTypes = require('prop-types');
var createClass = require('create-react-class');
var MarkdownUtils = require('../utils/MarkdownUtils');
var MarkdownEditorActions = require('../actions/MarkdownEditorActions');
var PublicMarkdownEditorActions = require('../actions/PublicMarkdownEditorActions');
var objectAssign = require('object-assign');

var _timerClick;

var MarkdownEditorContent = createClass({
  propTypes: {
    content: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired
  },

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      canClear: true,
    }
  },

  clearSelection: function() {
    if (this.state.canClear) {
      MarkdownEditorActions.clearSelection();
    }
  },

  bindSelectEvent: function(element) {
    element.addEventListener('select', this.onSelectHandler);
  },

  componentDidMount: function() {
    var element = this.textAreaElement;
    if (element) {
      this.bindSelectEvent(element);
      element.value = this.props.content;
    }
  },

  componentWillUpdate: function() {
    var element = this.textAreaElement;
    if (element) {
      this.unbindSelectEvent(element);
    }
  },

  componentDidUpdate: function() {
    var element = this.textAreaElement;
    if (element) {
      this.bindSelectEvent(element);
      element.value = this.props.content;
    }
  },

  unbindSelectEvent: function(element) {
    element.removeEventListener('select', this.onSelectHandler);
  },

  componentWillUnmount: function() {
    var element = this.textAreaElement;
    if (element) {
      this.unbindSelectEvent(element);
    }
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
      this.setState({canClear: false});
      _timerClick = setTimeout(function() {
        this.setState({canClear: true});
        _timerClick = null;
      }.bind(this), 100);
    }
  },

  render: function() {
     var styleMarkdownTextArea = objectAssign(MarkdownEditorContent.defaultProps.styles.styleMarkdownTextArea, this.props.styles.styleMarkdownTextArea)

    return (
      <textarea
        ref={(textArea) => { this.textAreaElement = textArea; }}
        className='md-editor-textarea'
        style={styleMarkdownTextArea}
        onChange={this.onChange}
        onClick={this.clearSelection}
        onKeyUp={this.clearSelection}>
      </textarea>
    );
  },

  onChange: function() {
    var content = this.textAreaElement.value;
    var markdownContent = MarkdownUtils.toMarkdown(content);
    PublicMarkdownEditorActions.updateText(markdownContent);

    this.props.onChangeHandler(content.replace(/[\n\r]/g, '\n'));
  },
});

MarkdownEditorContent.defaultProps = {
  styles : {
    styleMarkdownTextArea : {
      height: '90%',
      width: '100%',
      padding: '30px 10px',
      border: 'none'
    }
  }
}

module.exports = MarkdownEditorContent;
