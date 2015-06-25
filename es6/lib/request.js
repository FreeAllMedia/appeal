const request = require("request");

import Response from "./response.js";

export default class Request {
	constructor(method) {
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

	url(url) {
		this._url = url;
		return this;
	}

	data(data) {
		this._data = data;
		return this;
	}

	header(key, value) {
		this._headers[key] = value;
		return this;
	}

	results(callback) {
		let options = {
				method: this._method,
				url: this._url,
				headers: this._headers
			};

		//search if it's json
		let jsonContentTypeHeader = Object.keys(this._headers).find((headerName) => {
			return (headerName.toLowerCase() === "content-type"
				&& this._headers[headerName].indexOf("json") >= 0);
		});

		//infer json
		if(jsonContentTypeHeader) {
			this._json = true;
		}

		//add to the appropiate option
		if(this._data && this._json) {
			options.json = this._data;
		} else if(this._data) {
			options.body = this._data;
		} else if(this._json) {
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
