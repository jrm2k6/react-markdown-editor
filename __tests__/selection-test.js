// __tests__/selection-test.js

jest.dontMock('../src/MarkdownEditor');
jest.dontMock('../src/stores/MarkdownEditorStore');
jest.dontMock('../src/mixins/TextAreaSelectionMixin');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var MarkdownEditor = require('../src/MarkdownEditor');
var MarkdownEditorStore = require('../src/stores/MarkdownEditorStore');
var MarkdownSelectionActions = require('../src/actions/MarkdownSelectionActions');
var MarkdownEditorActions = require('../src/actions/MarkdownEditorActions');

afterEach(function() {
    jest.runAllTimers();
});

xdescribe('text selection when editing', function() {
    it('should set selection through action after selecting', function() {
      jest.useFakeTimers();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var textarea = TestUtils.findRenderedDOMComponentWithClass(editor, 'md-editor-textarea');
        var textareaNode = ReactDOM.findDOMNode(textarea);
        var _e = {
            srcElement: {
                selectionStart: 5,
                selectionEnd: 10,
                value: 'abcdefghijklmnopqrstuv'
            }
        };

        // when
        TestUtils.Simulate.select(textareaNode, _e);

        // then
        var param = {
            selectedText: 'fghij',
            selectionEnd: 10,
            selectionStart: 5
        };

        expect(MarkdownEditorActions.setSelection).toBeCalledWith(param);
    });
});

describe('clicking when editing', function() {
    it('should clear selection after clicking', function() {
        //given
        jest.useFakeTimers();
        MarkdownEditorActions.clearSelection = jest.fn();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var textarea = TestUtils.findRenderedDOMComponentWithClass(editor, 'md-editor-textarea');
        var textareaNode = ReactDOM.findDOMNode(textarea);

        // when
        TestUtils.Simulate.click(textareaNode);

        // then
        expect(MarkdownEditorActions.clearSelection).toBeCalled();
    });
});
