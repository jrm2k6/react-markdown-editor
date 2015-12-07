var Reflux = require('reflux');
var PublicMarkdownEditorActions = require('../actions/PublicMarkdownEditorActions');

var MarkdownEditorContentStore = Reflux.createStore({
  init: function() {
    this.listenTo(PublicMarkdownEditorActions.updateText, this.onUpdateText);
  },

  onUpdateText: function(updatedMarkdown) {
    this.trigger({content: updatedMarkdown});
  }
});

module.exports = MarkdownEditorContentStore;
