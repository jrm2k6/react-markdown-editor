var Reflux = require('reflux');
var MarkdownEditorActions = require('../actions/MarkdownEditorActions');

var MarkdownEditorTabsInteractionStore = Reflux.createStore({
  init: function() {
    this.listenTo(MarkdownEditorActions.clickPreviewTab, this.handleClickPreviewTab);
    this.listenTo(MarkdownEditorActions.clickEditorTab, this.handleClickEditorTab);
  },

  handleClickPreviewTab: function() {
    this.trigger({activeTab: 1});
  },

  handleClickEditorTab: function() {
    this.trigger({activeTab: 0});
  }
});

module.exports = MarkdownEditorTabsInteractionStore;
