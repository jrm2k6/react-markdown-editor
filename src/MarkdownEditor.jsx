import React from 'react'
import ReactDOM from 'react-dom'
import Reflux from 'reflux'
import MarkdownEditorActions from './actions/MarkdownEditorActions'
import PublicMarkdownEditorActions from './actions/PublicMarkdownEditorActions'
import MarkdownSelectionActions from './actions/MarkdownSelectionActions'
import TextAreaSelectionMixin from './mixins/TextAreaSelectionMixin'
import ButtonManagerMixin from './mixins/ButtonManagerMixin'
import MarkdownEditorStore from './stores/MarkdownEditorStore'
import MarkdownSelectionStore from './stores/MarkdownSelectionStore'
import MarkdownEditorTabsInteractionStore from './stores/MarkdownEditorTabsInteractionStore'
import {
  NullMarkdownToken, RegularMarkdownToken, HeaderMarkdownToken,
  SubHeaderMarkdownToken, UrlMarkdownToken, ListMarkdownToken,
  ImageMarkdownToken
} from './utils/MarkdownTokenFactory'
import MarkdownUtils from './utils/MarkdownUtils'
import MarkdownEditorMenu from './components/MarkdownEditorMenu'
import MarkdownEditorTabs from './components/MarkdownEditorTabs'
import MarkdownEditorContent from './components/MarkdownEditorContent'
import MarkdownEditorPreview from './components/MarkdownEditorPreview'
import objectAssign from 'object-assign'
import DefautStyle from './style/EditorStyle'

var MarkdownEditor = React.createClass({
  mixins: [Reflux.ListenerMixin],

  propTypes: {
    initialContent: React.PropTypes.string.isRequired,
    iconsSet: React.PropTypes.oneOf(['font-awesome', 'materialize-ui']),
    onContentChange: React.PropTypes.func,
    editorTabs: React.PropTypes.bool,
    previewClass: React.PropTypes.string,   // md-editor-preview
    textareaClass: React.PropTypes.string       // md-editor-textarea
  },

  getInitialState: function () {
    var uniqueInstanceRef = Math.random().toString(36).substring(7)
    return { content: this.props.initialContent, inEditMode: true, instanceRef: uniqueInstanceRef };
  },

  render: function () {
    var divContent;
    var editorMenu;

    if (this.state.inEditMode) {
      divContent = <MarkdownEditorContent className={this.props.textareaClass}
        styles={{ styleMarkdownTextArea: this.props.styles.styleMarkdownTextArea }}
        content={this.state.content} onChangeHandler={this.onChangeHandler} />;
      if (this.props.editorTabs !== false) {

        editorMenu = <MarkdownEditorMenu styles={{ styleMarkdownMenu: this.props.styles.styleMarkdownMenu }}
          iconSet={this.props.iconsSet} instanceRef={this.state.instanceRef} />;
      }
    } else {
      divContent = <MarkdownEditorPreview
        styles={{ styleMarkdownPreviewArea: this.props.styles.styleMarkdownPreviewArea }}
        content={this.state.content}
        className={this.props.previewClass}
      />;
      editorMenu = null;
    }

    var styleMarkdownEditorHeader = MarkdownEditor.defaultProps.styles.styleMarkdownEditorHeader;
    objectAssign(styleMarkdownEditorHeader, this.props.styles.styleMarkdownEditorHeader);

    var styleMarkdownEditorContainer = MarkdownEditor.defaultProps.styles.styleMarkdownEditorContainer;
    objectAssign(styleMarkdownEditorContainer, this.props.styles.styleMarkdownEditorContainer);

    return (
      <div style={styleMarkdownEditorContainer}>
        <div style={styleMarkdownEditorHeader} className='md-editor-header'>
          {editorMenu}
          <MarkdownEditorTabs styles={{
            styleMarkdownEditorTabs: this.props.styles.styleMarkdownEditorTabs,
            styleTab: this.props.styles.styleTab,
            styleActiveTab: this.props.styles.styleActiveTab
          }} />
        </div>
        {divContent}
      </div>
    );
  },

  onChangeHandler: function (newContent) {
    if (this.props.onContentChange) {
      this.props.onContentChange(newContent);
    }

    this.setState({ content: newContent });
  },

  componentDidMount: function () {
    this.listenTo(MarkdownEditorStore, this.handleMarkdowEditorStoreUpdated);
    this.listenTo(MarkdownEditorTabsInteractionStore, this.handleMDEditorTabsInteractionStoreUpdated);
  },

  handleMarkdowEditorStoreUpdated: function (markdownEditorStoreState) {
    var currentSelection = markdownEditorStoreState.currentSelection;

    if (currentSelection != null && markdownEditorStoreState.instanceRef === this.state.instanceRef) {
      this.updateText(this.state.content, currentSelection, markdownEditorStoreState.action);
    }
  },

  handleMDEditorTabsInteractionStoreUpdated: function (mdEditorTabsInteractionStoreState) {
    if (mdEditorTabsInteractionStoreState.activeTab != null) {
      var _inEditMode = mdEditorTabsInteractionStoreState.activeTab === 0;
      this.setState({ inEditMode: _inEditMode });
    }
  },

  updateText: function (text, selection, actionType) {
    var token = this.generateMarkdownToken(actionType);
    var beforeSelectionContent = text.slice(0, selection.selectionStart);
    var afterSelectionContent = text.slice(selection.selectionEnd, text.length);
    var updatedText = token.applyTokenTo(selection.selectedText);
    var _updatedContent = beforeSelectionContent + updatedText + afterSelectionContent;
    PublicMarkdownEditorActions.updateText(MarkdownUtils.toMarkdown(_updatedContent));
    this.setState({ content: _updatedContent });

    if (this.props.onContentChange) {
      this.props.onContentChange(_updatedContent);
    }
  },

  generateMarkdownToken: function (actionType) {
    switch (actionType) {
      case 'bold':
        return new RegularMarkdownToken('**', true);

      case 'italic':
        return new RegularMarkdownToken('_', true);

      case 'header':
        return new HeaderMarkdownToken();

      case 'subheader':
        return new SubHeaderMarkdownToken();

      case 'link':
        return new UrlMarkdownToken();

      case 'list':
        return new ListMarkdownToken();

      case 'image':
        return new ImageMarkdownToken();

      default:
        return new NullMarkdownToken();
    }
  }
});

MarkdownEditor.defaultProps = {
  styles: DefautStyle
}
export default MarkdownEditor
