/// <reference types="react" />
import { Component } from "react";
export default class MarkdownEditor extends Component<{
	initialContent: string
	iconsSet: 'materialize-ui' | 'font-awesome'
	onContentChange?: (content: string) => void
	styles?: {
		styleMarkdownEditorHeader?: React.CSSProperties
		styleMarkdownEditorContainer?: React.CSSProperties
		styleMarkdownMenu?: React.CSSProperties
		styleMarkdownTextArea?: React.CSSProperties
		styleMarkdownPreviewArea?: React.CSSProperties
		styleMarkdownEditorTabs?: React.CSSProperties
		styleTab?: React.CSSProperties
		styleActiveTab?: React.CSSProperties
	}
	previewClass?: string
	textareaClass?: string
}> { }
