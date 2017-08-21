import Reflux from 'reflux'
import MarkdownSelectionActions from '../actions/MarkdownSelectionActions'

var MarkdownSelectionStore = Reflux.createStore({
  init: function () {
    this.listenTo(MarkdownSelectionActions.selectionSet, this.handleSelectionSet);
    this.listenTo(MarkdownSelectionActions.selectionCleared, this.handleSelectionCleared);
  },

  handleSelectionCleared: function () {
    this.trigger({ type: 'clear' });
  },

  handleSelectionSet: function () {
    this.trigger({ type: 'set' });
  }
});
export default MarkdownSelectionStore;
