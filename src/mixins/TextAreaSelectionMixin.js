var MarkdownEditorActions = require('../actions/MarkdownEditorActions');
var Reflux = require('reflux');

var _timerClick;
var _canClear = true;

var TextAreaSelectionMixin = {
  mixins: [Reflux.ListenerMixin],

  
};

module.exports = TextAreaSelectionMixin;
