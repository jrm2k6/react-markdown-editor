import Reflux from 'reflux'

var MarkdownEditorActions = Reflux.createActions([
	'clearSelection',
	'clickEditorTab',
	'clickPreviewTab',
	'makeBold',
	'makeImage',
	'makeItalic',
	'makeLink',
	'makeList',
	'makeHeader',
	'makeSubHeader',
	'makeUnderline',
	'setSelection'
]);

export default MarkdownEditorActions
