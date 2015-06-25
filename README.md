# Appeal.js [![npm version](https://img.shields.io/npm/v/appeal.svg)](https://www.npmjs.com/package/appeal) [![license type](https://img.shields.io/npm/l/appeal.svg)](https://github.com/FreeAllMedia/appeal.git/blob/master/LICENSE) [![npm downloads](https://img.shields.io/npm/dm/appeal.svg)](https://www.npmjs.com/package/appeal) ![ECMAScript 6](https://img.shields.io/badge/ECMAScript-6-red.svg)

ES6 Component for making requests or appeals.

```javascript
import Request from "appeal";

Request.get
	.url("https://itunes.apple.com/search?term=appeal")
	.header("Content-Type", "application/json")
	.header("Custom-Header", "custom value")
	.results((error, result) => {
		//do somethig... result.body is json automatically, because the content type contains 'json' on it
	});
```

# Quality and Compatibility

[![Build Status](https://travis-ci.org/FreeAllMedia/appeal.png?branch=master)](https://travis-ci.org/FreeAllMedia/appeal) [![Coverage Status](https://coveralls.io/repos/FreeAllMedia/appeal/badge.svg)](https://coveralls.io/r/FreeAllMedia/appeal) [![Code Climate](https://codeclimate.com/github/FreeAllMedia/appeal/badges/gpa.svg)](https://codeclimate.com/github/FreeAllMedia/appeal) [![Dependency Status](https://david-dm.org/FreeAllMedia/appeal.png?theme=shields.io)](https://david-dm.org/FreeAllMedia/appeal?theme=shields.io) [![Dev Dependency Status](https://david-dm.org/FreeAllMedia/appeal/dev-status.svg)](https://david-dm.org/FreeAllMedia/appeal?theme=shields.io#info=devDependencies)

*Every build and release is automatically tested on the following platforms:*

![node 0.12.x](https://img.shields.io/badge/node-0.12.x-brightgreen.svg) ![node 0.11.x](https://img.shields.io/badge/node-0.11.x-brightgreen.svg) ![node 0.10.x](https://img.shields.io/badge/node-0.10.x-brightgreen.svg)
![iojs 2.x.x](https://img.shields.io/badge/iojs-2.x.x-brightgreen.svg) ![iojs 1.x.x](https://img.shields.io/badge/iojs-1.x.x-brightgreen.svg)


No support for browsers yet.
*If your platform is not listed above, you can test your local environment for compatibility by copying and pasting the following commands into your terminal:*

```
npm install appeal
cd node_modules/appeal
gulp test-local
```

# Installation

Copy and paste the following command into your terminal to install Appeal:

```
npm install appeal --save
```

## Import / Require

```
// ES6
import appeal from "appeal";
```

```
// ES5
var appeal = require("appeal");
```

```
// Require.js
define(["require"] , function (require) {
    var appeal = require("appeal");
});
```

# Getting Started

## Making requests
Importing Request will return an object with static methods for each one of the http verbs (currently just get, post, put and delete) that will allow you tu chain options until you finally get the results.

```javascript
import Request from "appeal";

Request.get
	.url("https://itunes.apple.com/search?term=appeal")
	.header("Content-Type", "application/json")
	.header("Custom-Header", "custom value")
	.results((error, result) => {
		//do somethig... result.body is json automatically, because the content type contains 'json' on it
	});
```
## Available methods
### Http verbs
* get
* post
* put
* delete

### Methods within the chain
#### url(endpointString)
	Where you specifi the resouce url address with the argument <endpointString>.
#### header(name, value)
	With this one you can add headers with <name>'s like Content-Type, or some Custom-One with the appropiate <value>.
#### data(object)
	Used to specify the body being <object> that body to be sent.
#### results(callback<error, result>)
	In the method you pass a callback function to it, which has available two arguments to receive: error, and the result. If there is a content type header specified containing the string json on it, it will try to parse de response to result.body automatically.

# How to Contribute

See something that could use improvement? Have a great feature idea? We listen!

You can submit your ideas through our [issues system](https://github.com/FreeAllMedia/appeal/issues), or make the modifications yourself and submit them to us in the form of a [GitHub pull request](https://help.github.com/articles/using-pull-requests/).

We always aim to be friendly and helpful.

## Running Tests

It's easy to run the test suite locally, and *highly recommended* if you're using Appeal.js on a platform we aren't automatically testing for.

```
npm test
```



