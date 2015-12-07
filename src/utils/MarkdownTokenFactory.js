var RegularMarkdownToken = function(token, isSymetric) {
  this.token = token;
  this.isSymetric = isSymetric;
};

RegularMarkdownToken.prototype.applyTokenTo = function(_text) {
  var res = this.token;
  res += _text;

  if (this.isSymetric) {
    res += this.token;
  }

  return res;
};

var NullMarkdownToken = function() {
  RegularMarkdownToken.call(this, '', false);
};

NullMarkdownToken.prototype = Object.create(RegularMarkdownToken.prototype);

NullMarkdownToken.prototype.applyTokenTo = function(_text) {
  return _text;
};

var HeaderMarkdownToken = function(_token) {
  var t = _token || '##';
  RegularMarkdownToken.call(this, t, false);
};

HeaderMarkdownToken.prototype = Object.create(RegularMarkdownToken.prototype);

HeaderMarkdownToken.prototype.applyTokenTo = function(_text) {
  return '\n' + this.token + ' ' + _text + '\n';
};

var SubHeaderMarkdownToken = function() {
  HeaderMarkdownToken.call(this, '###', false);
};

SubHeaderMarkdownToken.prototype = Object.create(HeaderMarkdownToken.prototype);

var UrlMarkdownToken = function() {
  RegularMarkdownToken.call(this, null, false);
};

UrlMarkdownToken.prototype = Object.create(RegularMarkdownToken.prototype);

UrlMarkdownToken.prototype.applyTokenTo = function(_text) {
  return '[' + _text + '](' + _text + ')';
};

var ListMarkdownToken = function() {
  RegularMarkdownToken.call(this, null, false);
};

ListMarkdownToken.prototype = Object.create(RegularMarkdownToken.prototype);

ListMarkdownToken.prototype.applyTokenTo = function(_text) {
  var items = _text.split('\n');
  var t = items.reduce(function(acc, item) {
    return acc + '+ ' + item + '\n';
  }, '\n');

  return t + '\n';
};

var ImageMarkdownToken = function() {
  RegularMarkdownToken.call(this, null, false);
};

ImageMarkdownToken.prototype = Object.create(RegularMarkdownToken.prototype);

ImageMarkdownToken.prototype.applyTokenTo = function(_text) {
  return '![' + _text + '](' + _text + ')';
};

module.exports = {
  RegularMarkdownToken: RegularMarkdownToken,
  NullMarkdownToken: NullMarkdownToken,
  HeaderMarkdownToken: HeaderMarkdownToken,
  SubHeaderMarkdownToken: SubHeaderMarkdownToken,
  UrlMarkdownToken: UrlMarkdownToken,
  ListMarkdownToken: ListMarkdownToken,
  ImageMarkdownToken: ImageMarkdownToken
};
