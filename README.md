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
			<MarkdownEditor initialContent="Test" iconsSet="font-awesome"/>
		);
	}
});

React.render(<TestComponent />, document.getElementById('content'));
```

```<MarkdownEditor /> ``` takes two required props:

    - initialContent which is the text you want the textarea to contain on initialization.
    - iconsSet which is the icons provider you want to use. It can either be font-awesome or materialize-ui

Optional props:

   - ```onContentChange```, function to be called on each content change (as the property name says!)

You can also listen to content changes on the editor. If you are using Reflux, by listening to the changes on ```MarkdownEditorContentStore```.
To be able to do so, just ```require('react-markdown-editor').MarkdownEditorContentStore;```

## Dependencies
You can modify the styles directly by modifying the styles declared in ```dist/MarkdownEditor.js```. The pre-existing styles assume that you are using Bootstrap and Font Awesome.
## TODO
- [ ] Better solution for styles
- [ ] Cross-browsers testing
- [ ] Move to Redux

## Example

```
cd Example
npm install
webpack
open index.html
```

## Issues/Contribution
You can open an issue on the github repo, or contact me directly by email.

## Help
Please, if you are using this package, let me know. I am interested to know what you think of it, even if it was on a tiny side-project.

## Screenshots
![Editing tab](http://i.imgur.com/XPdJmqm.png "Editing tab")
![Preview tab](http://i.imgur.com/uavBSUN.png "Preview tab")
