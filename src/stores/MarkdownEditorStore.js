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

  handleMakeBold: function(instanceRef) {    
    this.trigger({action: 'bold', currentSelection: this.currentSelection, instanceRef: instanceRef});
  },

  handleMakeItalic: function(instanceRef) {
    this.trigger({action: 'italic', currentSelection: this.currentSelection, instanceRef: instanceRef});
  },

  handleMakeLink: function(instanceRef) {
    this.trigger({action: 'link', currentSelection: this.currentSelection, instanceRef: instanceRef});
  },

  handleMakeUnderline: function(instanceRef) {
    this.trigger({action: 'underline', currentSelection: this.currentSelection, instanceRef: instanceRef});
  },

  handleMakeHeader: function(instanceRef) {
    this.trigger({action: 'header', currentSelection: this.currentSelection, instanceRef: instanceRef});
  },

  handleMakeSubHeader: function(instanceRef) {
    this.trigger({action: 'subheader', currentSelection: this.currentSelection, instanceRef: instanceRef});
  },

  handleMakeList: function(instanceRef) {
    this.trigger({action: 'list', currentSelection: this.currentSelection, instanceRef: instanceRef});
  },

  handleMakeImage: function(instanceRef) {
    this.trigger({action: 'image', currentSelection: this.currentSelection, instanceRef: instanceRef});
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
