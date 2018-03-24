var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var createClass = require('create-react-class');
var MarkdownUtils = require('../utils/MarkdownUtils');
var PublicMarkdownEditorActions = require('../actions/PublicMarkdownEditorActions');
var TextAreaSelectionMixin = require('../mixins/TextAreaSelectionMixin');
var objectAssign = require('object-assign');

var MarkdownEditorContent = createClass({
  propTypes: {
    content: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired
  },

  mixins: [TextAreaSelectionMixin],

  render: function() {
    var styleMarkdownTextArea = MarkdownEditorContent.defaultProps.styles.styleMarkdownTextArea
    objectAssign(styleMarkdownTextArea, this.props.styles.styleMarkdownTextArea)

    return (
      <textarea
        ref='editor'
        className='md-editor-textarea'
        style={styleMarkdownTextArea}
        onChange={this.onChange}
        onClick={this.clearSelection}
        onKeyUp={this.clearSelection}>
      </textarea>
    );
  },

  onChange: function() {
    var content = this.refs.editor.value;
    var markdownContent = MarkdownUtils.toMarkdown(content);
    PublicMarkdownEditorActions.updateText(markdownContent);

    this.props.onChangeHandler(content.replace(/[\n\r]/g, '\n'));
  },

  componentDidMount: function() {
    this.refs.editor.value = this.props.content;
  },

  componentDidUpdate: function() {
    this.refs.editor.value = this.props.content;
  }
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
