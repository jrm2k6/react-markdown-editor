var Reflux = require('reflux');
var MarkdownSelectionActions = require('../actions/MarkdownSelectionActions');

var MarkdownSelectionStore = Reflux.createStore({
  init: function() {
    this.listenTo(MarkdownSelectionActions.selectionSet, this.handleSelectionSet);
    this.listenTo(MarkdownSelectionActions.selectionCleared, this.handleSelectionCleared);
  },

  handleSelectionCleared: function() {
    this.trigger({type: 'clear'});
  },

  handleSelectionSet: function() {
    this.trigger({type: 'set'});
  }
});

module.exports = MarkdownSelectionStore;
