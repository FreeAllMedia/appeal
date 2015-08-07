const request = require("request");
import Response from "./response.js";

let privateData = new WeakMap();

let internal = function (object) {
    if (!privateData.has(object)) {
			privateData.set(object, {});
		}
    return privateData.get(object);
};

export default class Request {
	constructor(method) {
		internal(this)._method = method;
		internal(this)._data = null;
		internal(this)._url = null;
		internal(this)._headers = {};
		internal(this)._json = false;
	}

	url(url) {
		internal(this)._url = url;
		return this;
	}

	data(data) {
		internal(this)._data = data;
		return this;
	}

	header(key, value) {
		internal(this)._headers[key] = value;
		return this;
	}

	results(callback) {
		let options = {
				method: internal(this)._method,
				url: internal(this)._url,
				headers: internal(this)._headers
			};

		//search if it's json
		let jsonContentTypeHeader = Object.keys(internal(this)._headers).find((headerName) => {
			return (headerName.toLowerCase() === "content-type"
				&& internal(this)._headers[headerName].indexOf("json") >= 0);
		});

		//infer json
		if(jsonContentTypeHeader) {
			internal(this)._json = true;
		}

		//add to the appropiate option
		if(internal(this)._data && internal(this)._json) {
			options.json = internal(this)._data;
		} else if(internal(this)._data) {
			options.body = internal(this)._data;
		} else if(internal(this)._json) {
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

//public static properties
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
