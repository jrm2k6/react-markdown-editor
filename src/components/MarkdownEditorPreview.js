var MarkdownEditorPreview = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired
  },

  render: function() {
    // Breaklines in markdown are actually when a line is ended with two spaces + carriage-return
    var htmlContent = this.props.content.replace(/[\n]/g, '  \n');
    htmlContent = Markdown.toHTML(htmlContent);

    var styleMarkdownPreviewArea = {
      'height': '90%',
      'width': '100%',
      'padding': '30px 10px',
      'backgroundColor': '#fff',
      'border': 'none'
    };

    return (
      <div
        style={styleMarkdownPreviewArea}
        dangerouslySetInnerHTML={{__html: htmlContent}}
      />
    );
  }
});

export default MarkdownEditorPreview