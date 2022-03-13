"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _enumeration = _interopRequireDefault(require("../../../common/enumeration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fefaultConfig = {
  title: '',
  actionMode: _enumeration["default"].ActionMode.view,
  autoLoad: true,
  storeConfig: {
    moduleName: '',
    entityKey: '',
    entityName: '',
    action: {},
    mutation: {}
  }
};
var _default = fefaultConfig;
exports["default"] = _default;