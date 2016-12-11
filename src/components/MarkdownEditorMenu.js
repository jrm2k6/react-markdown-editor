var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var ButtonManagerMixin = require('../mixins/ButtonManagerMixin');
var MarkdownSelectionStore = require('../stores/MarkdownSelectionStore');
var MarkdownEditorActions = require('../actions/MarkdownEditorActions');
var objectAssign = require('object-assign');

var MarkdownEditorMenu = React.createClass({
  mixins: [Reflux.ListenerMixin, ButtonManagerMixin],

  propTypes: {
    iconsSet: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      enabled: false
    };
  },

  componentWillMount: function() {
    this.listenTo(MarkdownSelectionStore, this.handleMarkdownSelectionStore);
    this.setIconsProvider(this.props.iconsSet);
  },

  render: function() {

    var _disabled = (!this.state.enabled) ? 'disabled' : '';
    var boldButton = this.getBoldButton(_disabled, this.handleBoldButtonClick);
    var italicButton = this.getItalicButton(_disabled, this.handleItalicButtonClick);
    var makeListButton = this.getMakeListButton(_disabled, this.handleListButtonClick);
    var imageButton = this.getImageButton(_disabled, this.handleImageButtonClick);
    var linkButton = this.getLinkButton(_disabled, this.handleLinkButtonClick);
    var headerButton = this.getButtonWithoutIcon(_disabled, this.handleHeaderButtonClick, 'md-editor-menu-header', 'Header');
    var subHeaderButton = this.getButtonWithoutIcon(_disabled, this.handleSubHeaderButtonClick, 'md-editor-menu-subheader', 'Subheader');

    var styleMarkdownMenu = MarkdownEditorMenu.defaultProps.styles.styleMarkdownMenu;
    objectAssign(styleMarkdownMenu, this.props.styles.styleMarkdownMenu);

    return (
      <div style={styleMarkdownMenu} className='md-editor-menu'>
        {boldButton}
        {italicButton}
        {headerButton}
        {subHeaderButton}
        {makeListButton}
        {imageButton}
        {linkButton}
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

MarkdownEditorMenu.defaultProps = {
    styles: { 
        styleMarkdownMenu : {
            'margin': '5px 0',
            'flex': '1',
            'display': 'flex',
            'position': 'absolute',
            'right': '20px',
            'top': '10px'
        }
    }
}

module.exports = MarkdownEditorMenu;
