import Reflux from 'reflux'
import PublicMarkdownEditorActions from '../actions/PublicMarkdownEditorActions'

var MarkdownEditorContentStore = Reflux.createStore({
  init: function () {
    this.listenTo(PublicMarkdownEditorActions.updateText, this.onUpdateText);
  },

  onUpdateText: function (updatedMarkdown) {
    this.trigger({ content: updatedMarkdown });
  }
});

export default MarkdownEditorContentStore;
