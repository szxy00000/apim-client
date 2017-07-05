let schemaPromise = require('../schema').getSchemaPromise()
let fs = require('fs')
let shell = require('shelljs')
let Mock = require('mockjs')
let request = require('request')//.defaults({ proxy: 'http://127.0.0.1:8888' })
let url = require('url')
let apimMock = require('apim-mock')

let _config
let _schemaList = {}

let _method = {
	fixData: function(json, req) {
		if (json.type == 2) {
			return Mock.mock(eval('(' + json.content + ')'))
		} else if (json.type == 3) {
			let fn
			try {
				eval('fn = ' + json.content)
				return fn(req)
			} catch(e) {

			}
		} else {
			return json.content
		}
	},
	fakeData: function(schema) {
		if (schema.response && schema.response.body) {
			return apimMock.fakeBodyBySchema(schema.response.body)
		} else {
			return 'schema未定义完整'
		}
	},
	setMockData: function(path, folder, data) {
		if (!path) { return }
		if (path[0] === '/') { path = path.slice(1) }
		let fileName = path.substr(path.lastIndexOf('/') + 1)
		let fullPath = path.replace('/' + fileName, '')
		if (fileName !== fullPath) {
			shell.mkdir('-p', `${__dirname}/${folder}/${fullPath}`)
		} else {
			shell.mkdir('-p', `${__dirname}/${folder}`)
		}
		shell.touch(`${__dirname}/${folder}/${path}`)
		let json = JSON.parse(fs.readFileSync(`${__dirname}/${folder}/${path}`).toString() === 'undefined'? '{}': fs.readFileSync(`${__dirname}/${folder}/${path}`).toString() || "{}")
		Object.assign(json, data)
		fs.writeFile(`${__dirname}/${folder}/${path}`, JSON.stringify(json))
	},
	localMockPromise: function(resolve, reject, req, path) {
		let folder
		let choicedPath
		try {
			choicedPath = JSON.parse(fs.readFileSync(`${__dirname}/mockChoice`))[path] || ['','']
		} catch(e) {
			choicedPath = ['', '']
		}
		if (fs.existsSync(`${__dirname}/schemaData${path}`)) {
			if (fs.existsSync(`${__dirname}/myData${path}`)) {
				folder = choicedPath[0]? choicedPath[0]: Math.random() * 10 & 1? 'schemaData': 'myData'
			} else {
				folder = 'schemaData'
			}
		} else if (fs.existsSync(`${__dirname}/myData${path}`)) {
			folder = 'myData'
		} else if (_schemaList[path]) {
			resolve(_method.fakeData(_schemaList[path]))
		} else {
			resolve('schema未定义')
		}
		fs.readFile(`${__dirname}/${folder}${path}`, (err, data) => {
			if (data) {
				let json = JSON.parse(data.toString().replace(/(\n|\r|\s)/g, ''))
				let key = choicedPath[1]? choicedPath[1]: Object.keys(json)[~~(Math.random() * Object.keys(json).length)]
				if (key && json[key].content) {
					resolve(_method.fixData(json[key], req))
				} else {
					resolve(_method.fakeData(_schemaList[path]))
				}	
			} else if (_schemaList[path]) {
				resolve(_method.fakeData(_schemaList[path]))
			} else {
				resolve('schema未定义')
			}
		})
	},
	serverRequestPromise: function(resolve, reject, req) {
		let jar = request.jar()
		_config.cookie.split(';').forEach(one => {
			jar.setCookie(request.cookie(one), _config.server)
		})
		req.pipe(request(_config.server + url.parse(req.url).path, {
			gzip: true,
			jar: jar
		}, function(err, responese) {
			try {
				resolve(JSON.parse(responese.body))
			} catch(e) {
				resolve('server路径不存在')
			}
		}))
	},
	initLocalData: function() {
		schemaPromise.then(schemaArr => {
			schemaArr.forEach(one => {
				if (!one.myData) {
					_method.setMockData(one.path, 'schemaData', one.mocks)
					_schemaList[one.path] = one
				}
			})
		})
	}
}
_method.initLocalData()

/**
 * [getMockData description]
 * @param  {[type]} req  本地mock为函数时需要把请求信息传进去 RDserverMock则需转发req
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
exports.getMockData = function(req, path) {
	return new Promise(function(resolve, reject) {
		schemaPromise.then(schemaArr => {
			if (_config.server) {
				_method.serverRequestPromise(resolve, reject, req)
			} else {
				_method.localMockPromise(resolve, reject, req, path)
			}
		})
	})
}

exports.setMockData = function(reqBody) {
	let content
	eval('content=' + reqBody.content)
	_method.setMockData(reqBody.path, 'myData', {
		[reqBody.key]: {
			type: reqBody.type,
			content: content
		}
	})
}
exports.deleteMyData = function(path) {
	shell.rm('-f', `${__dirname}/myData${path}`)
}
exports.deleteMyMock = function(path, key) {
	let json = {}
	try {
		json = JSON.parse(fs.readFileSync(`${__dirname}/myData${path}`)) || {}
	} catch(e){}
	delete json[key]
	fs.writeFileSync(`${__dirname}/myData${path}`, JSON.stringify(json))
}
exports.getChoicedMock = function() {
	return JSON.parse(fs.readFileSync(`${__dirname}/mockChoice`)) || {}
}
exports.chooseMock = function(path, choice) {
	if (!fs.existsSync(`${__dirname}/schemaData${path}`) && !fs.existsSync(`${__dirname}/myData${path}`)) {
		return 'mock未保存'
	}
	let json = {}
	if (fs.existsSync(`${__dirname}/mockChoice`)) {
		json = JSON.parse(fs.readFileSync(`${__dirname}/mockChoice`)) || {}
	}
	json[path] = choice
	fs.writeFileSync(`${__dirname}/mockChoice`, JSON.stringify(json))
	return ''
}

exports.getConfig = function(config) {
	_config = config
	return module.exports
}