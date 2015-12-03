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
          "minWidth": "50px",
          "height": "20px",
          "border": "1px solid #ddd",
          "backgroundColor": "white",
          "borderRadius": "4px",
          "margin": "0 2px",
          "padding": "2px 3px",
          "cursor": "pointer",
          "textAlign": "center"
      };
    },

    getBoldButton: function(isDisabled, onClickHandler) {
      if (this.isFontAwesome()) {
        var _style = this.getStyleMarkdownBtn();
        return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-bold');
      } else {
        return null;
      }
    },

    getButtonFontAwesomeIcon: function(isDisabled, onClickHandler, styleBtn, iconName) {
      var _className = "btn fa " + iconName;
      return (
        <div role="button" style={styleBtn} disabled={isDisabled} className={_className} onClick={onClickHandler}></div>
      );
    },

    getButtonWithoutIcon: function(isDisabled, onClickHandler, styleBtn, additionalClassName, textBtn) {
      var _className = "btn fa " + additionalClassName;

      return (
        <div role="button" style={styleBtn} disabled={isDisabled} className={_className} onClick={onClickHandler}>{textBtn}</div>
      );
    },

    getItalicButton: function(isDisabled, onClickHandler) {
      if (this.isFontAwesome()) {
        var _style = this.getStyleMarkdownBtn();
        return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-italic');
      } else {
        return null;
      }
    },

    getHeaderButton: function() {

    },

    getSubHeaderButton: function() {

    },

    getMakeListButton: function(isDisabled, onClickHandler) {
      if (this.isFontAwesome()) {
        var _style = this.getStyleMarkdownBtn();
        return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-list-ul');
      } else {
        return null;
      }
    },

    getImageButton: function(isDisabled, onClickHandler) {
      if (this.isFontAwesome()) {
        var _style = this.getStyleMarkdownBtn();
        return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-file-image-o');
      } else {
        return null;
      }
    },

    getLinkButton: function(isDisabled, onClickHandler) {
      if (this.isFontAwesome()) {
        var _style = this.getStyleMarkdownBtn();
        return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-link');
      } else {
        return null;
      }
    }
}

module.exports = ButtonManagerMixin;
