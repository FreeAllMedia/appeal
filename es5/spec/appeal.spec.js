"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _libAppealJs = require("../lib/appeal.js");

var _libAppealJs2 = _interopRequireDefault(_libAppealJs);

describe("Appeal", function () {
	var component = undefined;

	before(function () {
		component = new _libAppealJs2["default"]();
	});

	it("should say something", function () {
		component.saySomething().should.equal("Something");
	});
});