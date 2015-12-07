var toMarkdown =  function(text) {
  return text.replace(/[\n\r]/g, '  \n');
};

module.exports = {
  toMarkdown: toMarkdown
};
