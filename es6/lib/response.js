
export default class Response {
	constructor(requestResponse) {
		Object.defineProperties(this, {
			"_requestResponse": {
				enumerable: false,
				writable: false,
				value: requestResponse
			},
			"status": {
				get: () => {
					return this._requestResponse.statusCode;
				}
			},
			"body": {
				get: () => {
					return this._requestResponse.body;
				}
			},
			"headers": {
				get: () => {
					return this._requestResponse.headers;
				}
			}
		});
	}
}
