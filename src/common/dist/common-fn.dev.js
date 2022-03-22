'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.redirectToApp = exports.focusFirstControl = exports.default = void 0

var _elementPlus = require('element-plus')

var _vue = require('vue')

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } }

function _createClass (Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor }

var getLinkToApp = function getLinkToApp (app) {
  return ''.concat(window.location.origin, '/').concat(app)
}

var redirectToApp = function redirectToApp (app, path) {
  var href = getLinkToApp(app)

  if (path) {
    href += ''.concat(path)
  }

  window.location.href = href
}

exports.redirectToApp = redirectToApp

var focusFirstControl = function focusFirstControl (container) {
  var controls = container.querySelectorAll('input[type="text"]:not([disabled]):not([readonly])')

  for (var index = 0; index < controls.length; index++) {
    var element = controls[index]
    var elementStyle = window.getComputedStyle(element)
    var isVisible = elementStyle.visibility !== 'hiddent' && elementStyle.display !== 'none'

    if (isVisible) {
      element.focus()
      break
    }
  }
}

exports.focusFirstControl = focusFirstControl

var CommonFn =
/* #__PURE__ */
(function () {
  function CommonFn () {
    _classCallCheck(this, CommonFn)
  }

  _createClass(CommonFn, [{
    key: 'showMask',
    value: function showMask (container) {
      var loadingInstance = _elementPlus.ElLoading.service({
        target: container,
        lock: true,
        text: 'Đang tải'
      })

      window.loadingInstance = loadingInstance
    }
  }, {
    key: 'hideMask',
    value: function hideMask () {
      window.loadingInstance.close()
    }
  }])

  return CommonFn
}())

var _default = new CommonFn()

exports.default = _default
