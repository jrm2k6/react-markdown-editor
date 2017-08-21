export function toMarkdown(text) {
  return text.replace(/[\n\r]/g, '  \n');
}
