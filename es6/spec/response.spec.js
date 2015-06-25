import Response from "../lib/response.js";

describe("Response", () => {
	let response,
		responseBody,
		headers;

	beforeEach(() => {
		responseBody = {name: "Tito Puente"};
		headers = {
			"Content-Type": "application/vnd.api+json",
			"Other-Header": "otherHeaderValue"
		};
		response = new Response({statusCode: 200, body: responseBody, headers: headers});
	});

	describe("(properties)", () => {
		it("should the correct status property", () => {
			response.status.should.equal(200);
		});

		it("should the correct body property", () => {
			response.body.should.eql(responseBody);
		});

		it("should the correct headers property", () => {
			response.headers.should.eql(headers);
		});
	});
});
