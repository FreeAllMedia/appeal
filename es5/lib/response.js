"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var privateData = new WeakMap();

var internal = function internal(object) {
	if (!privateData.has(object)) {
		privateData.set(object, {});
	}
	return privateData.get(object);
};

var Response = function Response(requestResponse) {
	var _this = this;

	_classCallCheck(this, Response);

	internal(this)._requestResponse = requestResponse;
	Object.defineProperties(this, {
		"status": {
			get: function get() {
				return internal(_this)._requestResponse.statusCode;
			}
		},
		"body": {
			get: function get() {
				return internal(_this)._requestResponse.body;
			}
		},
		"headers": {
			get: function get() {
				return internal(_this)._requestResponse.headers;
			}
		}
	});
};

exports["default"] = Response;
module.exports = exports["default"];