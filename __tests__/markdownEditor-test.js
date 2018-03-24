// __tests__/MarkdownEditor-test.js

jest.dontMock('../src/MarkdownEditor.js');
jest.dontMock('../src/components/MarkdownEditorMenu');
jest.dontMock('../src/components/MarkdownEditorTabs');
jest.dontMock('../src/mixins/ButtonManagerMixin.js');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-dom/test-utils');
var createRenderer = require('react-test-renderer/shallow').createRenderer;
var MarkdownEditor = require('../src/MarkdownEditor');
var MarkdownEditorMenu = require('../src/components/MarkdownEditorMenu');
var MarkdownEditorTabs = require('../src/components/MarkdownEditorTabs');
var MarkdownEditorActions = require('../src/actions/MarkdownEditorActions');
var PublicMarkdownEditorActions = require('../src/actions/PublicMarkdownEditorActions');
var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

describe('creates markdown editor', function() {
    it('creates markdown editor element composed of two divs', function() {
        var renderer = createRenderer();
        renderer.render(<MarkdownEditor
          initialContent="initialContent"
          iconsSet="font-awesome"/>
        );
        var result = renderer.getRenderOutput();
        expect(result.props.children.length).toEqual(2);
    });

    it('markdown editor header is composed of two divs in edit mode', function() {
        var renderer = createRenderer();
        renderer.render(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);

        var result = renderer.getRenderOutput();
        var menuElements = result.props.children[0];

        expect(menuElements.props.className).toEqual('md-editor-header');

        var children = menuElements.props.children;
        expect(children.length).toEqual(2);
        expect(children[0].type.displayName).toEqual('MarkdownEditorMenu');
        expect(children[1].type.displayName).toEqual('MarkdownEditorTabs');
    });

    it('markdown editor menu has 7 buttons', function() {
        var editor = enzyme.shallow(<MarkdownEditorMenu iconsSet="font-awesome"/>);
        expect(editor.children().length).toEqual(7);
    });

    it('markdown editor tabs element has 2 tabs', function() {
        var editor = enzyme.shallow(<MarkdownEditorTabs />);
        expect(editor.children().length).toEqual(2);
        var children = editor.children;
        expect(editor.childAt(0).type()).toEqual('div');
        expect(editor.childAt(0).childAt(0).type()).toEqual('span');
        expect(editor.childAt(1).type()).toEqual('div');
        expect(editor.childAt(1).childAt(0).type()).toEqual('span');
    });

    it('markdown editor content is edit mode by default and displays a text area', function() {
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var secondChild = ReactDOM.findDOMNode(editor).children[1];

        expect(secondChild.type).toEqual('textarea');
    });

    it('markdown editor content displays initial content on creation', function() {
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var editorTextArea = TestUtils.findRenderedDOMComponentWithTag(editor, 'textarea');
        expect(ReactDOM.findDOMNode(editorTextArea).value).toEqual('initialContent');
    });
});

describe('toggle preview mode', function() {
    it('clicking on preview tab changes mode', function() {
        //given
        MarkdownEditorActions.clickPreviewTab = jest.fn();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var previewTab = TestUtils.scryRenderedDOMComponentsWithClass(editor, 'md-editor-tabs-item')[1];
        var previewTabNode = ReactDOM.findDOMNode(previewTab);
        // when
        TestUtils.Simulate.click(previewTabNode);

        // then
        expect(MarkdownEditorActions.clickPreviewTab).toBeCalled();
        MarkdownEditorActions.clickPreviewTab.mockClear();
    });

    it('clicking on editor tab changes mode', function() {
        //given
        MarkdownEditorActions.clickEditorTab = jest.fn();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var editorTab = TestUtils.scryRenderedDOMComponentsWithClass(editor, 'md-editor-tabs-item')[0];
        var editorTabNode = ReactDOM.findDOMNode(editorTab);
        // when
        TestUtils.Simulate.click(editorTabNode);

        // then
        expect(MarkdownEditorActions.clickEditorTab).toBeCalled();
    });
});

describe('menu button interactions', function() {
    it('clicking on bold button dispatches action', function() {
        //given
        MarkdownEditorActions.makeBold = jest.fn();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'bold-btn');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);

        // then
        expect(MarkdownEditorActions.makeBold).toBeCalled();
    });

    it('clicking on italic button dispatches action', function() {
        //given
        MarkdownEditorActions.makeItalic = jest.fn();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'italic-btn');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);

        // then
        expect(MarkdownEditorActions.makeItalic).toBeCalled();
    });

    it('clicking on header button dispatches action', function() {
        //given
        MarkdownEditorActions.makeHeader = jest.fn();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'md-editor-menu-header');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);

        // then
        expect(MarkdownEditorActions.makeHeader).toBeCalled();
    });

    it('clicking on subheader button dispatches action', function() {
        //given
        MarkdownEditorActions.makeSubHeader = jest.fn();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'md-editor-menu-subheader');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);

        // then
        expect(MarkdownEditorActions.makeSubHeader).toBeCalled();
    });

    it('clicking on list button dispatches action', function() {
        //given
        MarkdownEditorActions.makeList = jest.fn();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'list-btn');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);

        // then
        expect(MarkdownEditorActions.makeList).toBeCalled();
    });

    it('clicking on image button dispatches action', function() {
        //given
        MarkdownEditorActions.makeImage = jest.fn();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'insert-img-btn');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);

        // then
        expect(MarkdownEditorActions.makeImage).toBeCalled();
    });

    it('clicking on link button dispatches action', function() {
        //given
        MarkdownEditorActions.makeLink = jest.fn();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var btn = TestUtils.findRenderedDOMComponentWithClass(editor, 'insert-link-btn');
        var btnNode = ReactDOM.findDOMNode(btn);

        // when
        TestUtils.Simulate.click(btnNode);
        expect(MarkdownEditorActions.makeLink).toBeCalled();
    });
});

describe('textarea changes behavior', function() {
    it('verify typing dispatches an action', function() {
        //given
        PublicMarkdownEditorActions.updateText = jest.fn();
        var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome"/>);
        var textarea = TestUtils.findRenderedDOMComponentWithClass(editor, 'md-editor-textarea');
        var textareaNode = ReactDOM.findDOMNode(textarea);

        // when
        TestUtils.Simulate.change(textareaNode, "markdownContent");

        // then
        expect(PublicMarkdownEditorActions.updateText).toBeCalled();
    });

    it('calls onContentChange if provided on each content change', function() {
      //given
      var onContentChangeCalled = 0;
      var _onContentChange = function(content) {
        onContentChangeCalled++;
      };

      var editor = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome" onContentChange={_onContentChange}/>);
      var textarea = TestUtils.findRenderedDOMComponentWithClass(editor, 'md-editor-textarea');
      var textareaNode = ReactDOM.findDOMNode(textarea);

      // when
      TestUtils.Simulate.change(textareaNode, "markdownContent");

      // then
      expect(onContentChangeCalled).toEqual(1);
    });
});
