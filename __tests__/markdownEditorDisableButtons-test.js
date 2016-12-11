// __tests__/markdownEditorDisableButtons-test.js

jest.dontMock('../src/MarkdownEditor.js');
jest.dontMock('../src/stores/MarkdownSelectionStore');
jest.dontMock('../src/stores/MarkdownEditorStore');
jest.dontMock('../src/actions/MarkdownEditorActions');
jest.dontMock('../src/actions/MarkdownSelectionActions');
jest.dontMock('../src/mixins/TextAreaSelectionMixin');

var React = require('react');
var TestUtils = require('react-addons-test-utils');
var MarkdownEditor = require('../src/MarkdownEditor');
var MarkdownSelectionStore = require('../src/stores/MarkdownSelectionStore');
var MarkdownSelectionActions = require('../src/actions/MarkdownSelectionActions');
var MarkdownEditorActions = require('../src/actions/MarkdownEditorActions');

describe('menu buttons state', function() {
    afterEach(function() {
        jest.runAllTimers();
    });

    it('buttons should be disabled when creating the editor', function() {
        // given
        jest.useFakeTimers();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btns = TestUtils.scryRenderedDOMComponentsWithClass(editor, "btn");

        // then
        btns.forEach(function(btn) {
            expect(btn.props.disabled).toEqual('disabled');
        });
    });

    it('buttons should be enabled when selection occurred the editor', function() {
        // given
        jest.useFakeTimers();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var textarea = TestUtils.findRenderedDOMComponentWithClass(editor, 'md-editor-textarea');
        var btns = TestUtils.scryRenderedDOMComponentsWithClass(editor, "btn");

        // when
        MarkdownSelectionActions.selectionSet();
        jest.runAllTimers();

        // then
        btns.forEach(function(btn) {
            expect(btns[0].props.disabled).toEqual('');
        });
    });

    it('buttons should be enabled when selection occurred the editor', function() {
        // given
        jest.useFakeTimers();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var textarea = TestUtils.findRenderedDOMComponentWithClass(editor, 'md-editor-textarea');
        var btns = TestUtils.scryRenderedDOMComponentsWithClass(editor, "btn");

        // when
        MarkdownSelectionActions.selectionSet();
        jest.runAllTimers();
        MarkdownSelectionActions.selectionCleared();
        jest.runAllTimers();

        // then
        btns.forEach(function(btn) {
            expect(btns[0].props.disabled).toEqual('disabled');
        });
    });
});
