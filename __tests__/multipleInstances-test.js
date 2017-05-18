// __tests__/multipleInstances-test.js

jest.dontMock('../src/MarkdownEditor');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var MarkdownEditor = require('../src/MarkdownEditor');

describe('multiple editor instances', function() {
    it('bold button applies only to the instance where it was click in', function() {

        //given
        jest.useFakeTimers();

        var editor1 = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome" onContentChange={(e)=>{return}}/>);
        var textarea1 = TestUtils.findRenderedDOMComponentWithClass(editor1, 'md-editor-textarea');
        var textareaNode1 = ReactDOM.findDOMNode(textarea1);
        var btn1 = TestUtils.findRenderedDOMComponentWithClass(editor1, 'bold-btn');
        var btnNode1 = ReactDOM.findDOMNode(btn1);        

        var editor2 = TestUtils.renderIntoDocument(<MarkdownEditor initialContent="initialContent" iconsSet="font-awesome" onContentChange={(e)=>{return}}/>);   
        var textarea2 = TestUtils.findRenderedDOMComponentWithClass(editor2, 'md-editor-textarea');
        var textareaNode2 = ReactDOM.findDOMNode(textarea2);        
        
        // when
        textareaNode1.select()        
        TestUtils.Simulate.click(btnNode1);
        jest.runAllTimers();

        // then    
        expect(textareaNode1.value).toEqual('**initialContent**');
        expect(textareaNode2.value).toEqual('initialContent');
    });

   
});
