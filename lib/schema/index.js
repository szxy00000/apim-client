let fs = require('fs')
let request = require('request')//.defaults({ proxy: 'http://127.0.0.1:8888' })
// let getChoicedMock = require('../mock').getChoicedMock

let _config
let _schemaArr

const defaultHost = 'http://cp01-rdqa-dev157-wuhuiyao.epc.baidu.com:8849'
const defaultSchemaUrl = '/api/getInterfaceSchemas'

let fetchSchema = function(resolve, reject) {
	let host = _config.host || defaultHost
	let schemaUrl = _config.schemaUrl || defaultSchemaUrl
	let suffix = (!~schemaUrl.indexOf('?') &&  !~schemaUrl.indexOf('&'))? '?': '&' 
	request({
		url: host + schemaUrl + suffix + 'token=' + _config.token,
		timeout: 2000
	}, function(err, res) {
		let schemaData
		if (err) {
			schemaData = JSON.parse(fs.readFileSync(`${__dirname}/schema`).toString()).data.listData
		} else {
			fs.writeFile(`${__dirname}/schema`, res.body)
			schemaData = JSON.parse(res.body).data.listData || []
		}
		let mySchema = {}
		try {
			mySchema = JSON.parse(fs.readFileSync(`${__dirname}/mySchema`).toString() || "{}")
		} catch(e) {}
		schemaData.forEach((one, index) => {
			if (mySchema[one.path]) {
				for(var j in mySchema[one.path].mocks) {
					mySchema[one.path].mocks[j]['from'] = 'myData'
				}
				Object.assign(one.mocks, mySchema[one.path].mocks)
				delete mySchema[one.path]
			}
		})
		for (let i in mySchema) {
			mySchema[i].myData = true
			schemaData.push(mySchema[i])
		}
		resolve(schemaData)
	})
}

exports.getSchemaList = function() {
	return new Promise(function(resolve, reject) {
		fs.readFile(`${__dirname}/schema`, function(err, data) {
			resolve(JSON.parse(data.toString()))
		})
	})
}
exports.getSchemaByPath = function(interfacePath) {
	return new Promise(function(resolve, reject) {
		let mySchema = {}
		try {
			mySchema = JSON.parse(fs.readFileSync(`${__dirname}/mySchema`).toString() || "{}")
		} catch(e) {}
		let { getChoicedMock } = require('../mock')
		let resolved = false
		fs.readFile(`${__dirname}/schema`, function(err, data) {
			JSON.parse(data.toString().replace(/(\\n|\s|\\t)/g, '')).data.listData.forEach(one => {
				if (one.path === interfacePath) {
					for(var i in one.mocks) {
						one.mocks[i]['from'] = 'schemaData'
					}
					if (mySchema[interfacePath]) {
						for(var j in mySchema[interfacePath].mocks) {
							mySchema[interfacePath].mocks[j]['from'] = 'myData'
						}
						Object.assign(one.mocks, mySchema[interfacePath].mocks)
					}
					try {
						one.mocks[getChoicedMock()[interfacePath][1]].choiced = true
					} catch(e) {
						one.unChoiced = true
					}
					resolve(one)
					resolved = true
				}
			})
			if (resolved) {return}
			try {
				mySchema[interfacePath].mocks[getChoicedMock()[interfacePath][1]].choiced = true
			} catch(e) {
				mySchema[interfacePath].unChoiced = true
			}
			resolve(mySchema[interfacePath])
		})
	})
}
exports.getSchemaPromise = function() {
	if (_schemaArr) {
		return new Promise((resolve, reject) => {
			resolve(_schemaArr)
		})
	} else {
		return new Promise(fetchSchema)
	}
}

exports.setMySchema = function(reqBody) {
	let json = {}
	try {
		json = JSON.parse(fs.readFileSync(`${__dirname}/mySchema`)) || {}
	} catch(e){}
	let content
	eval('content=' + reqBody.content)
	let mySchema = {
		path: reqBody.path,
		method: reqBody.method,
		name: reqBody['schema-name'],
		mocks: {
			[reqBody.key]: {
				type: reqBody.type,
				content: content
			}
		}
	}
	json[reqBody.path] = mySchema
	mySchema.myData = true
	_schemaArr.push(mySchema)
	fs.writeFileSync(`${__dirname}/mySchema`, JSON.stringify(json))
}
exports.deleteMySchema = function(path) {
	let json = {}
	try {
		json = JSON.parse(fs.readFileSync(`${__dirname}/mySchema`)) || {}
	} catch(e){}
	delete json[path]
	_schemaArr.forEach((one,index) => {
		if (one.path === path) {
			_schemaArr.splice(index, 1)
		}
	})
	fs.writeFileSync(`${__dirname}/mySchema`, JSON.stringify(json))
}
exports.deleteMyMock = function(path, key) {
	let json = {}
	try {
		json = JSON.parse(fs.readFileSync(`${__dirname}/mySchema`)) || {}
	} catch(e){}
	delete json[path]['mocks'][key]
	fs.writeFileSync(`${__dirname}/mySchema`, JSON.stringify(json))
}
exports.getConfig = function(config) {
	_config = config
	fetchSchema(schemaArr => _schemaArr = schemaArr)
	return module.exports
}