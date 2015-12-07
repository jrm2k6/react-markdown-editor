var Reflux = require('reflux');

var MarkdownSelectionActions = Reflux.createActions([
	'selectionCleared',
	'selectionSet'
]);

module.exports = MarkdownSelectionActions;
