var Reflux = require('reflux');
var MarkdownEditorActions = require('../actions/MarkdownEditorActions');
var MarkdownSelectionActions = require('../actions/MarkdownSelectionActions');

var MarkdownEditorStore = Reflux.createStore({
  init: function() {
    this.currentSelection = null;
    this.listenTo(MarkdownEditorActions.makeBold, this.handleMakeBold);
    this.listenTo(MarkdownEditorActions.makeItalic, this.handleMakeItalic);
    this.listenTo(MarkdownEditorActions.makeHeader, this.handleMakeHeader);
    this.listenTo(MarkdownEditorActions.makeSubHeader, this.handleMakeSubHeader);
    this.listenTo(MarkdownEditorActions.makeImage, this.handleMakeImage);
    this.listenTo(MarkdownEditorActions.makeLink, this.handleMakeLink);
    this.listenTo(MarkdownEditorActions.makeList, this.handleMakeList);
    this.listenTo(MarkdownEditorActions.makeUnderline, this.handleMakeUnderline);
    this.listenTo(MarkdownEditorActions.clearSelection, this.handleClearSelection);
    this.listenTo(MarkdownEditorActions.setSelection, this.handleSetSelection);
  },

  handleMakeBold: function() {
    this.trigger({action: 'bold', currentSelection: this.currentSelection});
  },

  handleMakeItalic: function() {
    this.trigger({action: 'italic', currentSelection: this.currentSelection});
  },

  handleMakeLink: function() {
    this.trigger({action: 'link', currentSelection: this.currentSelection});
  },

  handleMakeUnderline: function() {
    this.trigger({action: 'underline', currentSelection: this.currentSelection});
  },

  handleMakeHeader: function() {
    this.trigger({action: 'header', currentSelection: this.currentSelection});
  },

  handleMakeSubHeader: function() {
    this.trigger({action: 'subheader', currentSelection: this.currentSelection});
  },

  handleMakeList: function() {
    this.trigger({action: 'list', currentSelection: this.currentSelection});
  },

  handleMakeImage: function() {
    this.trigger({action: 'image', currentSelection: this.currentSelection});
  },

  handleClearSelection: function() {
    this.currentSelection = null;
    MarkdownSelectionActions.selectionCleared();
  },

  handleSetSelection: function(_selection) {
    this.currentSelection = _selection;
    MarkdownSelectionActions.selectionSet();
  }
});

module.exports = MarkdownEditorStore;
