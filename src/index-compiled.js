'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

require('./styles/styles.css');

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');

require('../node_modules/toastr/build/toastr.min.css');

var _reduxLocalstorage = require('redux-localstorage');

var _reduxLocalstorage2 = _interopRequireDefault(_reduxLocalstorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enhancer = (0, _redux.compose)((0, _reduxLocalstorage2.default)());

var store = (0, _configureStore2.default)(enhancer);

(0, _reactDom.render)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_reactRouter.Router, { history: _reactRouter.browserHistory, routes: _routes2.default })
), document.getElementById('app'));

//# sourceMappingURL=index-compiled.js.map