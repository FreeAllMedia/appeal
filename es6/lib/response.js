let privateData = new WeakMap();

let internal = function (object) {
    if (!privateData.has(object)) {
			privateData.set(object, {});
		}
    return privateData.get(object);
};

export default class Response {
	constructor(requestResponse) {
		internal(this)._requestResponse = requestResponse;
		//public functions
		Object.defineProperties(this, {
			"status": {
				get: () => {
					return internal(this)._requestResponse.statusCode;
				}
			},
			"body": {
				get: () => {
					return internal(this)._requestResponse.body;
				}
			},
			"headers": {
				get: () => {
					return internal(this)._requestResponse.headers;
				}
			}
		});
	}
}
