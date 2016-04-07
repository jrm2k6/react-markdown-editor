var ReactMarkdownEditor = require('react-markdown-editor');
var MarkdownEditor = ReactMarkdownEditor.MarkdownEditor;
var ExampleWithOnChangeContent = require('./components/ExampleWithOnChangeContent');
var ReactDOM = require('react-dom');
var React = require('react');

$(document).ready(function() {
  ReactDOM.render(React.createElement(MarkdownEditor, {initialContent: 'My initial content', iconsSet: 'font-awesome'}),
    document.getElementById('react-container-1'));
  ReactDOM.render(React.createElement(MarkdownEditor, {initialContent: 'My initial content', iconsSet: 'materialize-ui'}),
    document.getElementById('react-container-2'));
  ReactDOM.render(React.createElement(ExampleWithOnChangeContent),
    document.getElementById('react-container-3'));
});
