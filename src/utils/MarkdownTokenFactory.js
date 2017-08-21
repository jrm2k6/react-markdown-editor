export class RegularMarkdownToken {
  constructor(token, isSymetric) {
    this.token = token;
    this.isSymetric = isSymetric;
  }
  applyTokenTo(_text) {
    var res = this.token;
    res += _text;
    if (this.isSymetric) {
      res += this.token;
    }
    return res;
  }
}


export class NullMarkdownToken extends RegularMarkdownToken {
  constructor() {
    super('', false);
  }
  applyTokenTo(_text) {
    return _text;
  }
}

export class HeaderMarkdownToken extends RegularMarkdownToken {
  constructor(_token) {
    super(_token || '##', false)
  }
  applyTokenTo(_text) {
    return '\n' + this.token + ' ' + _text + '\n';
  }
}

export class SubHeaderMarkdownToken extends RegularMarkdownToken {
  constructor() {
    super('###', false);
  }
}

export class UrlMarkdownToken extends RegularMarkdownToken {
  constructor() {
    super(null, false);
  }
  applyTokenTo(_text) {
    return '[' + _text + '](' + _text + ')';
  }
}

export class ListMarkdownToken extends RegularMarkdownToken {
  constructor() {
    super(null, false)
  }
  applyTokenTo(_text) {
    var items = _text.split('\n');
    var t = items.reduce(function (acc, item) {
      return acc + '+ ' + item + '\n';
    }, '\n');
    return t + '\n';
  }
}

export class ImageMarkdownToken extends RegularMarkdownToken {
  constructor() {
    super(null, false);
  }
  applyTokenTo(_text) {
    return '![' + _text + '](' + _text + ')';
  }
}
