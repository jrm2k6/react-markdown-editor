var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var createClass = require('create-react-class');
var Markdown = require('markdown').markdown;
var objectAssign = require('object-assign');

var MarkdownEditorPreview = createClass({
  propTypes: {
    content: PropTypes.string.isRequired
  },

  render: function() {
    // Breaklines in markdown are actually when a line is ended with two spaces + carriage-return
    var htmlContent = this.props.content.replace(/[\n]/g, '  \n');
    htmlContent = Markdown.toHTML(htmlContent);

    var styleMarkdownPreviewArea = objectAssign(MarkdownEditorPreview.defaultProps.styles.styleMarkdownPreviewArea, this.props.styles.styleMarkdownPreviewArea);

    return (
      <div
        style={styleMarkdownPreviewArea}
        dangerouslySetInnerHTML={{__html: htmlContent}}
      />
    );
  }
});

MarkdownEditorPreview.defaultProps = {
    styles : {
        styleMarkdownPreviewArea : {
            height: '90%',
            width: '100%',
            padding: '30px 10px',
            backgroundColor: '#fff',
            border: 'none'
        }
    }
}

module.exports = MarkdownEditorPreview;
