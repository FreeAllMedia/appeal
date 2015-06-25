"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _responseJs = require("./response.js");

var _responseJs2 = _interopRequireDefault(_responseJs);

var request = require("request");

var Request = (function () {
	function Request(method) {
		_classCallCheck(this, Request);

		Object.defineProperties(this, {
			"_method": {
				enumerable: false,
				writable: true,
				value: method
			},
			"_data": {
				enumerable: false,
				writable: true,
				value: null
			},
			"_url": {
				enumerable: false,
				writable: true,
				value: null
			},
			"_headers": {
				enumerable: false,
				writable: true,
				value: {}
			},
			"_json": {
				enumerable: false,
				writable: true,
				value: false
			}
		});
	}

	_createClass(Request, [{
		key: "url",
		value: function url(_url) {
			this._url = _url;
			return this;
		}
	}, {
		key: "data",
		value: function data(_data) {
			this._data = _data;
			return this;
		}
	}, {
		key: "header",
		value: function header(key, value) {
			this._headers[key] = value;
			return this;
		}
	}, {
		key: "results",
		value: function results(callback) {
			var _this = this;

			var options = {
				method: this._method,
				url: this._url,
				headers: this._headers
			};

			//search if it's json
			var jsonContentTypeHeader = Object.keys(this._headers).find(function (headerName) {
				return headerName.toLowerCase() === "content-type" && _this._headers[headerName].indexOf("json") >= 0;
			});

			//infer json
			if (jsonContentTypeHeader) {
				this._json = true;
			}

			//add to the appropiate option
			if (this._data && this._json) {
				options.json = this._data;
			} else if (this._data) {
				options.body = this._data;
			} else if (this._json) {
				options.json = {};
			}

			request(options, function (error, response, body) {
				if (response) {
					response.body = body || response.body;
				}
				callback(error, new _responseJs2["default"](response));
			});
		}
	}]);

	return Request;
})();

exports["default"] = Request;

Object.defineProperties(Request, {
	"post": {
		get: function get() {
			return new Request("POST");
		}
	},
	"put": {
		get: function get() {
			return new Request("PUT");
		}
	},
	"get": {
		get: function get() {
			return new Request("GET");
		}
	},
	"delete": {
		get: function get() {
			return new Request("DELETE");
		}
	}
});
module.exports = exports["default"];