# react-markdown-editor
A markdown editor using React/Reflux.


[![Build Status](http://img.shields.io/travis/jrm2k6/react-markdown-editor/master.svg?style=flat-square)](https://travis-ci.org/jrm2k6/react-markdown-editor)
[![Code Climate](https://img.shields.io/codeclimate/github/kabisaict/flow.svg?style=flat-square)](https://codeclimate.com/github/jrm2k6/react-markdown-editor)
[![License](https://img.shields.io/npm/l/express.svg?style=flat-square)](http://www.opensource.org/licenses/MIT)
[![Latest Version](https://img.shields.io/npm/v/react-markdown-editor.svg?style=flat-square)](https://www.npmjs.com/package/react-markdown-editor)
[![Total Downloads](https://img.shields.io/npm/dm/react-markdown-editor.svg?style=flat-square)](https://www.npmjs.com/package/react-markdown-editor)

##TLDR
Demo here: http://jrm2k6.github.io/react-markdown-editor/

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
- [x] Cross-browsers issues
- [ ] Better solution for styles
- [x] Upgrade to React 0.13
- [x] Unit testing
- [ ] Cross-browsers testing

## Issues/Contribution
You can open an issue on the github repo, or contact me directly by email.

## Screenshots
![Editing tab](http://i.imgur.com/XPdJmqm.png "Editing tab")
![Preview tab](http://i.imgur.com/uavBSUN.png "Preview tab")
