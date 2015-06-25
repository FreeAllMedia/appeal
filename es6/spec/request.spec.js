const sinon = require("sinon");

import Request from "../lib/request.js";
import Router from "omnirouter";
import Response from "../lib/response.js";

describe("Request", () => {

	describe("(static properties)", () => {
		describe(".post", () => {
			it("should return a request object instance", () => {
				Request.post.should.be.instanceOf(Request);
			});
		});

		describe(".put", () => {
			it("should return a request object instance", () => {
				Request.put.should.be.instanceOf(Request);
			});
		});

		describe(".get", () => {
			it("should return a request object instance", () => {
				Request.get.should.be.instanceOf(Request);
			});
		});

		describe(".delete", () => {
			it("should return a request object instance", () => {
				Request.delete.should.be.instanceOf(Request);
			});
		});
	});

	describe("(instance methods)", () => {
		describe(".url", () => {
			it("should return a request object instance", () => {
				Request.post.url("http://www.test.com").should.be.instanceOf(Request);
			});
		});

		describe(".data", () => {
			it("should return a request object instance", () => {
				Request.post.data("http://www.test.com").should.be.instanceOf(Request);
			});
		});

		describe(".header", () => {
			it("should return a request object instance", () => {
				Request.post.header("http://www.test.com").should.be.instanceOf(Request);
			});
		});

		describe(".results", () => {
			it("should callback", done => {
				Request.post
					.results(() => {
						done();
					});
			});
		});
	});

	describe("(functionality)", () => {
		const requestData = {somenumber: 23, somestring: "somestring"},
			responseData = {somenumber: 344, somestring: "responsestring"};

		let postSpy,
			putSpy,
			getSpy,
			deleteSpy,
			urlPost = "/test",
			urlPut = "/test/1",
			urlGet = "/test/1",
			urlDelete = "/test/1",
			router,
			portNumber = 1339,
			headers,
			headersSpy,
			requestBodySpy,
			responseBodySpy,
			completeUrl;

		class TestRouter extends Router {
			initialize() {
				this.post(urlPost, (request, response) => {
					postSpy(request, response);
				});
				this.put(urlPut, (request, response) => {
					putSpy(request, response);
				});
				this.get(urlGet, (request, response) => {
					getSpy(request, response);
				});
				this.delete(urlDelete, (request, response) => {
					deleteSpy(request, response);
				});
			}
		}

		before(done => {
			headers = {
				"Content-Type": "application/vnd.api+json",
				"Custom-Header": "customvalue"
			};
			router = new TestRouter();
			router.listen(portNumber, () => {
				done();
			});
		});

		after(done => {
			router.close(() => {
				done();
			});
		});

		beforeEach(() => {
			headersSpy = sinon.spy();
			responseBodySpy = sinon.spy();
			requestBodySpy = sinon.spy();
		});

		describe("(complete chains)", () => {
			describe("Request.post.url.data.header.results", () => {
				beforeEach(done => {
					completeUrl = "http://localhost:" + portNumber + urlPost;

					postSpy = sinon.spy((request, response) => {
						let receivedHeaders = {
							"Content-Type": request.header("Content-Type"),
							"Custom-Header": request.header("Custom-Header")
						};
						headersSpy(receivedHeaders);
						requestBodySpy(request.body);
						response.send(responseData);
					});

					Request.post
						.url(completeUrl)
						.data(requestData)
						.header("Content-Type", headers["Content-Type"])
						.header("Custom-Header", headers["Custom-Header"])
						.results((error, result) => {
							if(result) {
								responseBodySpy(result.body);
							}
							done();
						});
				});

				it("should send the appropiate headers", () => {
					headersSpy.calledWithExactly(headers).should.be.true;
				});

				it("should use the appropiate url + method", () => {
					postSpy.called.should.be.true;
				});

				it("should get the appropiate result", () => {
					responseBodySpy.calledWithExactly(responseData).should.be.true;
				});

				it("should get the appropiate result", () => {
					responseBodySpy.calledWithExactly(responseData).should.be.true;
				});

				it("should send the appropiate body", () => {
					requestBodySpy.calledWithExactly(requestData).should.be.true;
				});
			});

			describe("Request.put.url.data.header.results", () => {
				beforeEach(done => {
					completeUrl = "http://localhost:" + portNumber + urlPut;

					putSpy = sinon.spy((request, response) => {
						let receivedHeaders = {
							"Content-Type": request.header("Content-Type"),
							"Custom-Header": request.header("Custom-Header")
						};
						headersSpy(receivedHeaders);
						requestBodySpy(request.body);
						response.send(responseData);
					});

					Request.put
						.url(completeUrl)
						.data(requestData)
						.header("Content-Type", headers["Content-Type"])
						.header("Custom-Header", headers["Custom-Header"])
						.results((error, result) => {
							if(result) {
								responseBodySpy(result.body);
							}
							done();
						});
				});

				it("should send the appropiate headers", () => {
					headersSpy.calledWithExactly(headers).should.be.true;
				});

				it("should use the appropiate url + method", () => {
					putSpy.called.should.be.true;
				});

				it("should get the appropiate result", () => {
					responseBodySpy.calledWithExactly(responseData).should.be.true;
				});

				it("should send the appropiate body", () => {
					requestBodySpy.calledWithExactly(requestData).should.be.true;
				});
			});

			describe("Request.get.url.header.results", () => {
				beforeEach(done => {
					completeUrl = "http://localhost:" + portNumber + urlGet;

					getSpy = sinon.spy((request, response) => {
						let receivedHeaders = {
							"Content-Type": request.header("Content-Type"),
							"Custom-Header": request.header("Custom-Header")
						};
						headersSpy(receivedHeaders);
						response.send(responseData);
					});

					Request.get
						.url(completeUrl)
						.header("Content-Type", headers["Content-Type"])
						.header("Custom-Header", headers["Custom-Header"])
						.results((error, result) => {
							if(result) {
								responseBodySpy(result.body);
							}
							done();
						});
				});

				it("should send the appropiate headers", () => {
					headersSpy.calledWithExactly(headers).should.be.true;
				});

				it("should use the appropiate url + method", () => {
					getSpy.called.should.be.true;
				});

				it("should get the appropiate result", () => {
					responseBodySpy.calledWithExactly(responseData).should.be.true;
				});
			});

			describe("Request.delete.url.header.results", () => {
				beforeEach(done => {
					completeUrl = "http://localhost:" + portNumber + urlDelete;

					deleteSpy = sinon.spy((request, response) => {
						let receivedHeaders = {
							"Content-Type": request.header("Content-Type"),
							"Custom-Header": request.header("Custom-Header")
						};
						headersSpy(receivedHeaders);
						response.send(responseData);
					});

					Request.delete
						.url(completeUrl)
						.header("Content-Type", headers["Content-Type"])
						.header("Custom-Header", headers["Custom-Header"])
						.results((error, result) => {
							if(result) {
								responseBodySpy(result.body);
							}
							done();
						});
				});

				it("should send the appropiate headers", () => {
					headersSpy.calledWithExactly(headers).should.be.true;
				});

				it("should use the appropiate url + method", () => {
					deleteSpy.called.should.be.true;
				});

				it("should get the appropiate result", () => {
					responseBodySpy.calledWithExactly(responseData).should.be.true;
				});
			});
		});

		describe("(callback response)", () => {
			it("it should be an instance of the Response object", done => {
				Request.get
					.url(completeUrl)
					.header("Content-Type", headers["Content-Type"])
					.header("Custom-Header", headers["Custom-Header"])
					.results((error, result) => {
						result.should.be.instanceOf(Response);
						done();
					});
			});

			it("it should return json with a custom json content type", done => {
				getSpy = sinon.spy((request, response) => {
					response.set("Content-Type", "application/vnd.api+json");
					response.send(responseData);
				});

				Request.get
					.url(completeUrl)
					.header("Content-Type", headers["Content-Type"])
					.header("Custom-Header", headers["Custom-Header"])
					.results((error, result) => {
						result.body.should.eql(responseData);
						done();
					});
			});
		});
	});
});
