var React = require('react/addons');
var Markdown = require( "markdown" ).markdown;
var PublicMarkdownEditorActions = require('../actions/PublicMarkdownEditorActions');
var TextAreaSelectionMixin = require('../mixins/TextAreaSelectionMixin');
var MarkdownEditorStore = require('../stores/MarkdownEditorStore');
var MarkdownUtils = require('../utils/MarkdownUtils');

var MarkdownEditorContent = React.createClass({displayName: "MarkdownEditorContent",
    propTypes : {
        content: React.PropTypes.string.isRequired,
        onChangeHandler: React.PropTypes.func.isRequired
    },

    mixins: [TextAreaSelectionMixin],

    render: function() {
        var styleMarkdownTextArea = {
            "height": "90%",
            "width": "100%",
            "padding": "30px 10px",
            "border": "none"
        };

        return  React.createElement("textarea", {ref: "editor", className: "md-editor-textarea", 
                          style: styleMarkdownTextArea, 
                          onChange: this.onChange}
                )
    },

    onChange: function() {
        var content = this.refs.editor.getDOMNode().value;
        var markdownContent = MarkdownUtils.toMarkdown(content);
        PublicMarkdownEditorActions.updateText(markdownContent);
        
        this.props.onChangeHandler(content.replace(/[\n\r]/g, '\n'));
    },

    componentDidMount: function() {
        this.refs.editor.getDOMNode().value = this.props.content;
    },

    componentDidUpdate: function() {
        this.refs.editor.getDOMNode().value = this.props.content;  
    }
});

module.exports = MarkdownEditorContent;