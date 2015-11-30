/** @jsx React.DOM */

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var Markdown = require('markdown').markdown;
var MarkdownEditorActions = require('./actions/MarkdownEditorActions');
var PublicMarkdownEditorActions = require('./actions/PublicMarkdownEditorActions');
var MarkdownSelectionActions = require('./actions/MarkdownSelectionActions');
var TextAreaSelectionMixin = require('./mixins/TextAreaSelectionMixin');
var MarkdownEditorStore = require('./stores/MarkdownEditorStore');
var MarkdownSelectionStore = require('./stores/MarkdownSelectionStore');
var MarkdownEditorTabsInteractionStore = require('./stores/MarkdownEditorTabsInteractionStore');
var MarkdownTokenFactory = require('./utils/MarkdownTokenFactory');
var MarkdownUtils = require('./utils/MarkdownUtils');

var NullMarkdownToken = MarkdownTokenFactory.NullMarkdownToken;
var RegularMarkdownToken = MarkdownTokenFactory.RegularMarkdownToken;
var HeaderMarkdownToken = MarkdownTokenFactory.HeaderMarkdownToken;
var SubHeaderMarkdownToken = MarkdownTokenFactory.SubHeaderMarkdownToken;
var UrlMarkdownToken = MarkdownTokenFactory.UrlMarkdownToken;
var ListMarkdownToken = MarkdownTokenFactory.ListMarkdownToken;
var ImageMarkdownToken = MarkdownTokenFactory.ImageMarkdownToken;

var MarkdownEditorMenu = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {
            enabled: false
        };
    },

    componentWillMount: function() {
        this.listenTo(MarkdownSelectionStore, this.handleMarkdownSelectionStore);
    },

    render: function() {
        var styleMarkdownBtn = {
            "minWidth": "50px",
            "height": "20px",
            "border": "1px solid #ddd",
            "backgroundColor": "white",
            "borderRadius": "4px",
            "margin": "0 2px",
            "padding": "2px 3px",
            "cursor": "pointer",
            "textAlign": "center"
        };

        var styleMarkdownMenu = {
            "margin": "5px 0"
        }

        var _disabled = (!this.state.enabled) ? "disabled" : "";

        return (
            <div style={styleMarkdownMenu} className="col-md-6 pull-right md-editor-menu">
                <div role="button" style={styleMarkdownBtn} disabled={_disabled} className="btn fa fa-bold" onClick={this.handleBoldButtonClick}></div>
                <div role="button" style={styleMarkdownBtn} disabled={_disabled} className="btn fa fa-italic" onClick={this.handleItalicButtonClick}></div>
                <div role="button" style={styleMarkdownBtn} disabled={_disabled} className="btn fa md-editor-menu-header" onClick={this.handleHeaderButtonClick}>Header</div>
                <div role="button" style={styleMarkdownBtn} disabled={_disabled} className="btn fa md-editor-menu-subheader" onClick={this.handleSubHeaderButtonClick}>Subheader</div>
                <div role="button" style={styleMarkdownBtn} disabled={_disabled} className="btn fa fa-list-ul" onClick={this.handleListButtonClick}></div>
                <div role="button" style={styleMarkdownBtn} disabled={_disabled} className="btn fa fa-file-image-o" onClick={this.handleImageButtonClick}></div>
                <div role="button" style={styleMarkdownBtn} disabled={_disabled} className="btn fa fa-link" onClick={this.handleLinkButtonClick}></div>
           </div>
        );
    },

    handleMarkdownSelectionStore: function(data) {
        if (data.type === 'clear') {
            this.setState({enabled: false});
        } else if (data.type === 'set') {
            this.setState({enabled: true});
        }
    },

    handleBoldButtonClick: function() {
        MarkdownEditorActions.makeBold();
    },

    handleImageButtonClick: function() {
        MarkdownEditorActions.makeImage();
    },

    handleItalicButtonClick: function() {
        MarkdownEditorActions.makeItalic();
    },

    handleUnderlineButtonClick: function() {
        MarkdownEditorActions.makeUnderline();
    },

    handleHeaderButtonClick: function() {
        MarkdownEditorActions.makeHeader();
    },

    handleSubHeaderButtonClick: function() {
        MarkdownEditorActions.makeSubHeader();
    },

    handleLinkButtonClick: function() {
        MarkdownEditorActions.makeLink();
    },

    handleListButtonClick: function() {
        MarkdownEditorActions.makeList();
    }
});

var MarkdownEditorTabs = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {activeTab: 0}
    },

    componentWillMount: function() {
        this.listenTo(MarkdownEditorTabsInteractionStore, this.handleMDEditorTabsInteractionStoreUpdated);
    },

    handleMDEditorTabsInteractionStoreUpdated: function(storeState) {
        if (storeState.activeTab != null) {
            this.setState({activeTab: storeState.activeTab});
        }
    },

    render: function() {
        var styleMarkdownEditorTabs = {
            "border": "none"
        };

        var tabClassName = "md-editor-tabs-item";
        var editorTabClassName = tabClassName;
        var previewTabClassName = tabClassName;
        if (this.state.activeTab === 0) {
            editorTabClassName += " active";
        } else if (this.state.activeTab === 1) {
            previewTabClassName += " active";
        }

        return (
            <div className="col-md-4 md-editor-tabs">
                <ul style={styleMarkdownEditorTabs} className="nav nav-tabs">
                    <li className={editorTabClassName}
                        onClick={this.handleClick.bind(this, "clickEditorTab")}><a>Editor</a></li>
                    <li className={previewTabClassName}
                        onClick={this.handleClick.bind(this, "clickPreviewTab")}><a>Preview</a></li>
                </ul>
            </div>
        );
    },

    handleClick: function(actionName) {
        MarkdownEditorActions[actionName]();
    }
});

var MarkdownEditorContent = React.createClass({
    propTypes : {
        content: React.PropTypes.string.isRequired,
        onChangeHandler: React.PropTypes.func.isRequired
    },

    mixins: [TextAreaSelectionMixin],

    render: function() {
        var styleMarkdownTextArea = {
            "height": "90%",
            "width": "100%",
            "padding": "30px 10px",
            "border": "none"
        };

        return  (
            <textarea
              ref="editor"
              className="md-editor-textarea"
              style={styleMarkdownTextArea}
              onChange={this.onChange}
              onClick={this.clearSelection}
              onKeyUp={this.clearSelection}>
            </textarea>
        );
    },

    onChange: function() {
        var content = this.refs.editor.value;
        var markdownContent = MarkdownUtils.toMarkdown(content);
        PublicMarkdownEditorActions.updateText(markdownContent);

        this.props.onChangeHandler(content.replace(/[\n\r]/g, '\n'));
    },

    componentDidMount: function() {
        this.refs.editor.value = this.props.content;
    },

    componentDidUpdate: function() {
        this.refs.editor.value = this.props.content;
    }
});

var MarkdownEditorPreview = React.createClass({
    propTypes: {
        content: React.PropTypes.string.isRequired
    },

    render: function() {
        // Breaklines in markdown are actually when a line is ended with two spaces + carriage-return
        var htmlContent = this.props.content.replace(/[\n]/g, "  \n");
        htmlContent = Markdown.toHTML(htmlContent);

        var styleMarkdownPreviewArea = {
            "height": "90%",
            "width": "100%",
            "padding": "30px 10px",
            "backgroundColor": "#fff",
            "border": "none",
        };

        return  (
            <div style={styleMarkdownPreviewArea}
                 dangerouslySetInnerHTML={{__html: htmlContent}}
            />
        );
    }
});

var MarkdownEditor = React.createClass({
    mixins: [Reflux.ListenerMixin],

    propTypes: {
        initialContent: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {content: this.props.initialContent, inEditMode: true};
    },

    render: function() {
        var divContent;
        var editorMenu;

        if (this.state.inEditMode) {
            divContent = <MarkdownEditorContent content={this.state.content} onChangeHandler={this.onChangeHandler}/>;
            editorMenu = <MarkdownEditorMenu />
        } else {
            divContent = <MarkdownEditorPreview content={this.state.content} />;
            editorMenu = null;
        }

        var styleMarkdownEditorHeader = {
          "borderBottom": "1px solid #ddd",
          "marginLeft": "0px",
          "marginRight": "0px"
        }

        var styleMarkdownEditorContainer = {
          "marginTop": "2px",
          "paddingTop" : "10px",
          "border": "1px solid #ddd",
          "backgroundColor": "#f7f7f7"
        }

        return (
                <div style={styleMarkdownEditorContainer}>
                    <div style={styleMarkdownEditorHeader} className="row md-editor-header">
                        {editorMenu}
                        <MarkdownEditorTabs />
                    </div>
                    {divContent}
                </div>
            );
    },

    onChangeHandler: function(newContent) {
        this.setState({content: newContent});
    },

    componentDidMount: function() {
        this.listenTo(MarkdownEditorStore, this.handleMarkdowEditorStoreUpdated);
        this.listenTo(MarkdownEditorTabsInteractionStore, this.handleMDEditorTabsInteractionStoreUpdated);
    },

    handleMarkdowEditorStoreUpdated: function(markdownEditorStoreState) {
        var currentSelection = markdownEditorStoreState.currentSelection;

        if (currentSelection != null) {
            this.updateText(this.state.content, currentSelection, markdownEditorStoreState.action)
        }
    },

    handleMDEditorTabsInteractionStoreUpdated: function(mdEditorTabsInteractionStoreState) {
        if (mdEditorTabsInteractionStoreState.activeTab != null) {
            var _inEditMode = mdEditorTabsInteractionStoreState.activeTab === 0;
            this.setState({inEditMode: _inEditMode});
        }
    },

    updateText: function(text, selection, actionType) {
        var token = this.generateMarkdownToken(actionType);
        var beforeSelectionContent = text.slice(0, selection.selectionStart);
        var afterSelectionContent = text.slice(selection.selectionEnd, text.length);
        var updatedText = token.applyTokenTo(selection.selectedText);

        var _updatedContent = beforeSelectionContent + updatedText + afterSelectionContent;
        PublicMarkdownEditorActions.updateText(MarkdownUtils.toMarkdown(_updatedContent));
        this.setState({content: _updatedContent});
    },

    generateMarkdownToken: function(actionType) {
        switch (actionType) {
            case "bold":
                return new RegularMarkdownToken("**", true);

            case "italic":
                return new RegularMarkdownToken("_", true);

            case "header":
                return new HeaderMarkdownToken();

            case "subheader":
                return new SubHeaderMarkdownToken();

            case "link":
                return new UrlMarkdownToken();

            case "list":
                return new ListMarkdownToken();

            case "image":
                return new ImageMarkdownToken();

            default:
                return new NullMarkdownToken();
        }
    }
});

module.exports = MarkdownEditor;
