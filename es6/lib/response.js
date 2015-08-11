import privateData from "incognito";

export default class Response {
	constructor(requestResponse) {
		const _ = privateData(this);
		_.requestResponse = requestResponse;
		Object.defineProperties(this, {
			"status": {
				get: () => {
					return _.requestResponse.statusCode;
				}
			},
			"body": {
				get: () => {
					return _.requestResponse.body;
				}
			},
			"headers": {
				get: () => {
					return _.requestResponse.headers;
				}
			}
		});
	}
}
