import React from 'react'
import ReactDOM from 'react-dom'
import MarkdownUtils from '../utils/MarkdownUtils'
import PublicMarkdownEditorActions from '../actions/PublicMarkdownEditorActions'
import TextAreaSelectionMixin from '../mixins/TextAreaSelectionMixin'
import objectAssign from 'object-assign'

var MarkdownEditorContent = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    onChangeHandler: React.PropTypes.func.isRequired,
    className: React.PropTypes.string     // textareaClass
  },

  mixins: [TextAreaSelectionMixin],

  render: function () {
    var styleMarkdownTextArea = MarkdownEditorContent.defaultProps.styles.styleMarkdownTextArea
    objectAssign(styleMarkdownTextArea, this.props.styles.styleMarkdownTextArea)

    return (
      <textarea
        ref='editor'
        className={this.props.className || 'md-editor-textarea'}
        style={styleMarkdownTextArea}
        onChange={this.onChange}
        onClick={this.clearSelection}
        onKeyUp={this.clearSelection}>
      </textarea>
    );
  },

  onChange: function () {
    var content = this.refs.editor.value;
    var markdownContent = MarkdownUtils.toMarkdown(content);
    PublicMarkdownEditorActions.updateText(markdownContent);

    this.props.onChangeHandler(content.replace(/[\n\r]/g, '\n'));
  },

  componentDidMount: function () {
    this.refs.editor.value = this.props.content;
  },

  componentDidUpdate: function () {
    this.refs.editor.value = this.props.content;
  }
});

MarkdownEditorContent.defaultProps = {
  styles: {
    styleMarkdownTextArea: {
      height: '90%',
      width: '100%',
      padding: '30px 10px',
      border: 'none'
    }
  }
}

export default MarkdownEditorContent
