import request from "request";
import privateData from "incognito";

import Response from "./response.js";

export default class Request {
	constructor(method) {
		const _ = privateData(this);
		_.method = method;
		_.data = null;
		_.url = null;
		_.headers = {};
		_.json = false;
	}

	url(url) {
		privateData(this).url = url;
		return this;
	}

	data(data) {
		privateData(this).data = data;
		return this;
	}

	header(key, value) {
		privateData(this).headers[key] = value;
		return this;
	}

	results(callback) {
		const _ = privateData(this);
		let options = {
				method: _.method,
				url: _.url,
				headers: _.headers
			};

		//search if it's json
		let jsonContentTypeHeader = Object.keys(_.headers).find((headerName) => {
			return (headerName.toLowerCase() === "content-type"
				&& _.headers[headerName].indexOf("json") >= 0);
		});

		//infer json
		if(jsonContentTypeHeader) {
			_.json = true;
		}

		//add to the appropiate option
		if(_.data && _.json) {
			options.json = _.data;
		} else if(_.data) {
			options.body = _.data;
		} else if(_.json) {
			options.json = {};
		}

		request(options,
			(error, response, body) => {
				if(response) {
					response.body = body || response.body;
				}
				callback(error, new Response(response));
			}
		);
	}
}

Object.defineProperties(Request, {
	"post": {
		get: () => {
			return new Request("POST");
		}
	},
	"put": {
		get: () => {
			return new Request("PUT");
		}
	},
	"get": {
		get: () => {
			return new Request("GET");
		}
	},
	"delete": {
		get: () => {
			return new Request("DELETE");
		}
	}
});
