// __tests__/MarkdownEditor-test.js

jest.dontMock('../src/MarkdownEditor.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var MarkdownEditor = require('../src/MarkdownEditor.js');

describe('creates markdown editor', function() {
	it('creates markdown editor element', function() {
		var editor = TestUtils.renderIntoDocument(<div></div>);
	});
});
