var MarkdownEditorContent = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    onChangeHandler: React.PropTypes.func.isRequired
  },

  mixins: [TextAreaSelectionMixin],

  render: function() {
    var styleMarkdownTextArea = {
      'height': '90%',
      'width': '100%',
      'padding': '30px 10px',
      'border': 'none'
    };

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

export default MarkdownEditorContent