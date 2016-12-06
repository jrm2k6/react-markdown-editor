var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var MarkdownEditorActions = require('../actions/MarkdownEditorActions');
var MarkdownEditorTabsInteractionStore = require('../stores/MarkdownEditorTabsInteractionStore');

var MarkdownEditorTabs = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      activeTab: 0
    };
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
      'border': 'none',
      'display': 'flex',
      'justifyContent': 'flex-start'
    };

    if(this.props.hasOwnProperty('styles') && this.props.styles.hasOwnProperty('styleMarkdownEditorTabs')) {
        Object.assign(styleMarkdownEditorTabs, this.props.styles.styleMarkdownEditorTabs);
    }

    var styleTab = {
      'padding': '0px 20px',
      'cursor': 'pointer',
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'height': '50px'
    };

    if(this.props.hasOwnProperty('styles') && this.props.styles.hasOwnProperty('styleTab')) {
        Object.assign(styleTab, this.props.styles.styleTab);
    }

    var styleActiveTab = {
      'padding': '0px 20px',
      'cursor': 'pointer',
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'height': '50px',
      'borderLeft': '1px solid #ddd',
      'borderRight': '1px solid #ddd',
      'borderTop': '1px solid #ddd',
      'backgroundColor': '#fff',
      'borderRadius': '3px'
    };

    if(this.props.hasOwnProperty('styles') && this.props.styles.hasOwnProperty('styleActiveTab')) {
        Object.assign(styleActiveTab, this.props.styles.styleActiveTab);
    }

    var editorTabStyle;
    var previewTabStyle;
    if (this.state.activeTab === 0) {
      editorTabStyle = styleActiveTab;
      previewTabStyle = styleTab;
    } else if (this.state.activeTab === 1) {
      previewTabStyle = styleActiveTab;
      editorTabStyle = styleTab;
    }

    return (
      <div style={styleMarkdownEditorTabs} className='md-editor-tabs'>
        <div style={editorTabStyle}
          className="md-editor-tabs-item"
          onClick={this.handleClick.bind(this, 'clickEditorTab')}>
          <span>Editor</span>
        </div>
        <div style={previewTabStyle}
          className="md-editor-tabs-item"
          onClick={this.handleClick.bind(this, 'clickPreviewTab')}>
          <span>Preview</span>
        </div>
      </div>
    );
  },

  handleClick: function(actionName) {
    MarkdownEditorActions[actionName]();
  }
});

module.exports = MarkdownEditorTabs