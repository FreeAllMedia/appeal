"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _libResponseJs = require("../lib/response.js");

var _libResponseJs2 = _interopRequireDefault(_libResponseJs);

describe("Response", function () {
	var response = undefined,
	    responseBody = undefined,
	    headers = undefined;

	beforeEach(function () {
		responseBody = { name: "Tito Puente" };
		headers = {
			"Content-Type": "application/vnd.api+json",
			"Other-Header": "otherHeaderValue"
		};
		response = new _libResponseJs2["default"]({ statusCode: 200, body: responseBody, headers: headers });
	});

	describe("(properties)", function () {
		it("should the correct status property", function () {
			response.status.should.equal(200);
		});

		it("should the correct body property", function () {
			response.body.should.eql(responseBody);
		});

		it("should the correct headers property", function () {
			response.headers.should.eql(headers);
		});
	});
});