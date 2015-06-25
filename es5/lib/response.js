"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function Response(requestResponse) {
	var _this = this;

	_classCallCheck(this, Response);

	Object.defineProperties(this, {
		"_requestResponse": {
			enumerable: false,
			writable: false,
			value: requestResponse
		},
		"status": {
			get: function get() {
				return _this._requestResponse.statusCode;
			}
		},
		"body": {
			get: function get() {
				return _this._requestResponse.body;
			}
		},
		"headers": {
			get: function get() {
				return _this._requestResponse.headers;
			}
		}
	});
};

exports["default"] = Response;
module.exports = exports["default"];