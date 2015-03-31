# react-markdown-editor
A markdown editor using React/Reflux.

####WARNING: This is some work in progress. Please check the list of issues before opening a new one. I am really willing to fix/add features to it, but I do it on my free time, so it can take a bit of time. Of course, contributions are welcome.

## Installation
``` npm install --save react-markdown-editor ```

## Features
From the UI:

- Bold
- Italic
- Header
- Subheader
- Link
- Unordered List
- Inline Images

Of course it is a regular markdown editor (using the nice [markdown-js](https://github.com/evilstreak/markdown-js) library), so you are not limited to the UI. 

## Usage
To render the component:
```
var React = require('react');
var MarkdownEditor = require('react-markdown-editor').MarkdownEditor;

var TestComponent = React.createClass({
	render: function() {
		return (
			<MarkdownEditor initialContent="Test"/>
		);
	}
});

React.render(<TestComponent />, document.getElementById('content'));
```

```<MarkdownEditor /> ``` has only one prop, the initial content of the textarea.

You can also listen to content changes on the editor. If you are using Reflux, by listening to the changes on ```MarkdownEditorContentStore```.
To be able to do so, just ```require('react-markdown-editor').MarkdownEditorContentStore;```
## Dependencies
You can modify the styles directly by modifying the styles declared in ```dist/MarkdownEditor.js```. The pre-existing styles assume that you are using Bootstrap and Font Awesome.
## TODO
- [ ] Cross-browsers issues
- [ ] Better solution for styles
- [ ] Upgrade to React 0.13
- [ ] Unit testing
- [ ] Cross-browsers testing

## Issues/Contribution
You can open an issue on the github repo, or contact me directly by email.

## Screenshots
![Editing tab](http://i.imgur.com/XPdJmqm.png "Editing tab")
![Preview tab](http://i.imgur.com/uavBSUN.png "Preview tab")
