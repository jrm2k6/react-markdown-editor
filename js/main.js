(function() {
	var React = require('react/addons');
	var Reflux = require('reflux');
	var MarkdownEditor = require('react-markdown-editor').MarkdownEditor;

	var demoElement = document.getElementById("demo");

	React.render(<MarkdownEditor initialContent="###Hey, welcome in my React **Markdown** Editor"/>, demoElement);
}());
