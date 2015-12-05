var ReactMarkdownEditor = require('react-markdown-editor');
var MarkdownEditor = ReactMarkdownEditor.MarkdownEditor;
var ReactDOM = require('react-dom');
var React = require('react');

$(document).ready(function() {
  ReactDOM.render(React.createElement(MarkdownEditor, {initialContent: 'My initial content', iconsSet: 'materialize-ui'}),
    document.getElementById('react-container'));
});
