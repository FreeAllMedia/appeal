"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

var _responseJs = require("./response.js");

var _responseJs2 = _interopRequireDefault(_responseJs);

var Request = (function () {
	function Request(method) {
		_classCallCheck(this, Request);

		var _ = (0, _incognito2["default"])(this);
		_.method = method;
		_.data = null;
		_.url = null;
		_.headers = {};
		_.json = false;
	}

	_createClass(Request, [{
		key: "url",
		value: function url(_url) {
			(0, _incognito2["default"])(this).url = _url;
			return this;
		}
	}, {
		key: "data",
		value: function data(_data) {
			(0, _incognito2["default"])(this).data = _data;
			return this;
		}
	}, {
		key: "header",
		value: function header(key, value) {
			(0, _incognito2["default"])(this).headers[key] = value;
			return this;
		}
	}, {
		key: "results",
		value: function results(callback) {
			var _ = (0, _incognito2["default"])(this);
			var options = {
				method: _.method,
				url: _.url,
				headers: _.headers
			};

			//search if it's json
			var jsonContentTypeHeader = Object.keys(_.headers).find(function (headerName) {
				return headerName.toLowerCase() === "content-type" && _.headers[headerName].indexOf("json") >= 0;
			});

			//infer json
			if (jsonContentTypeHeader) {
				_.json = true;
			}

			//add to the appropiate option
			if (_.data && _.json) {
				options.json = _.data;
			} else if (_.data) {
				options.body = _.data;
			} else if (_.json) {
				options.json = {};
			}

			(0, _request2["default"])(options, function (error, response, body) {
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