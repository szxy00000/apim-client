'use strict';
let url = require('url')
let shell = require('shelljs')

module.exports = function(config, app) {
	// module init
	let schema = require('./schema').getConfig(config)
	let mock = require('./mock').getConfig(config)
	let server = require('./server').getConfig(config)
	
	// app route based on schema
	schema.getSchemaPromise().then(schemaArr => {
		schemaArr.forEach(one => {
			one.path && app[one.method? one.method.toLowerCase(): 'all'](one.path, function(req, res) {
				mock.getMockData(req, one.path).then(data => {
					res.send(data)
				})
			})
		})
		app.use(function(req, res, next){
		  	mock.getMockData(req, url.parse(req.url).path).then(data => {
				res.send(data)
			})
		})
	})
}

