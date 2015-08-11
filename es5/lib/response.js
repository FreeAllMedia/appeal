"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

var Response = function Response(requestResponse) {
	_classCallCheck(this, Response);

	var _ = (0, _incognito2["default"])(this);
	_.requestResponse = requestResponse;
	Object.defineProperties(this, {
		"status": {
			get: function get() {
				return _.requestResponse.statusCode;
			}
		},
		"body": {
			get: function get() {
				return _.requestResponse.body;
			}
		},
		"headers": {
			get: function get() {
				return _.requestResponse.headers;
			}
		}
	});
};

exports["default"] = Response;
module.exports = exports["default"];