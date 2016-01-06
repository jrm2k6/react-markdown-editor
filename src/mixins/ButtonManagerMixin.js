var React = require('react');
var ReactDOM = require('react-dom');

var ButtonManagerMixin = {
  iconsProviderName: null,

  setIconsProvider: function(name) {
    this.iconsProviderName = name;
  },

  isFontAwesome: function() {
    return this.iconsProviderName === 'font-awesome';
  },

  getStyleMarkdownBtn: function() {
    return {
      'flex': '1',
      'maxWidth': '50px',
      'border': '1px solid #ddd',
      'backgroundColor': 'white',
      'borderRadius': '4px',
      'margin': '0 2px',
      'padding': '2px 3px',
      'cursor': 'pointer',
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center'
    };
  },

  getBoldButton: function(isDisabled, onClickHandler) {
    var _style = this.getStyleMarkdownBtn();
    if (this.isFontAwesome()) {
      return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-bold', 'bold-btn');
    } else {
      return this.getButtonMaterializeIcon(isDisabled, onClickHandler, _style, 'format_bold', 'bold-btn');
    }
  },

  getButtonMaterializeIcon: function(isDisabled, onClickHandler, styleBtn, iconName, containerClassName) {
    return (
      <div role='button' className={containerClassName} style={styleBtn} disabled={isDisabled} onClick={onClickHandler}>
        <i className='material-icons'>{iconName}</i>
      </div>
    );
  },

  getButtonFontAwesomeIcon: function(isDisabled, onClickHandler, styleBtn, iconName, containerClassName) {
    var _className = 'fa ' + iconName;
    return (
      <div role='button' className={containerClassName} style={styleBtn} disabled={isDisabled} onClick={onClickHandler}>
        <i className={_className}></i>
      </div>
    );
  },

  getButtonWithoutIcon: function(isDisabled, onClickHandler, additionalClassName, textBtn) {
    var styleBtn = {
      'display': 'flex',
      'minWidth': '50px',
      'border': '1px solid #ddd',
      'color': 'black',
      'backgroundColor': 'white',
      'borderRadius': '4px',
      'margin': '0 2px',
      'padding': '2px 3px',
      'cursor': 'pointer',
      'textAlign': 'center',
      'justifyContent': 'flex-end',
      'alignItems': 'center'
    };

    return (
      <div role='button' style={styleBtn} className={additionalClassName} disabled={isDisabled} onClick={onClickHandler}>
        <span>{textBtn}</span>
      </div>
    );
  },

  getItalicButton: function(isDisabled, onClickHandler) {
    if (this.isFontAwesome()) {
      var _style = this.getStyleMarkdownBtn();
      return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-italic', 'italic-btn');
    } else {
      var _style = this.getStyleMarkdownBtn();
      return this.getButtonMaterializeIcon(isDisabled, onClickHandler, _style, 'format_italic', 'italic-btn');
    }
  },

  getMakeListButton: function(isDisabled, onClickHandler) {
    if (this.isFontAwesome()) {
      var _style = this.getStyleMarkdownBtn();
      return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-list-ul', 'list-btn');
    } else {
      var _style = this.getStyleMarkdownBtn();
      return this.getButtonMaterializeIcon(isDisabled, onClickHandler, _style, 'format_list_bulleted', 'list-btn');
    }
  },

  getImageButton: function(isDisabled, onClickHandler) {
    if (this.isFontAwesome()) {
      var _style = this.getStyleMarkdownBtn();
      return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-file-image-o', 'insert-img-btn');
    } else {
      var _style = this.getStyleMarkdownBtn();
      return this.getButtonMaterializeIcon(isDisabled, onClickHandler, _style, 'insert_photo', 'insert-img-btn');
    }
  },

  getLinkButton: function(isDisabled, onClickHandler) {
    if (this.isFontAwesome()) {
      var _style = this.getStyleMarkdownBtn();
      return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-link', 'insert-link-btn');
    } else {
      var _style = this.getStyleMarkdownBtn();
      return this.getButtonMaterializeIcon(isDisabled, onClickHandler, _style, 'insert_link', 'insert-link-btn');
    }
  }
};

module.exports = ButtonManagerMixin;
