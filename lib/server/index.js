let childProc = require('child_process')
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let swig = require('swig')
let url = require('url')

let schema = require('../schema')
let mock = require('../mock')
let _config

app.use( bodyParser() ); 
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/static'))

app.get('/index', function(req, res) {
	schema.getSchemaPromise().then(schema => {
		res.send(swig.compileFile(__dirname + '/views/index.html')({
			schema: schema
		}));
	})
});
// app.get('*', function(req, res) {
//     res.redirect('/index')
// })

app.post('/setMock', (req, res) => {
	mock.setMockData(req.body)
	schema.setMySchema(req.body)
	res.send('成功')
})
app.post('/chooseMock', (req, res) => {
	res.send(mock.chooseMock(req.body.path, req.body.choice))
})

app.get('/getSchemaHTML', (req, res) => {
	schema.getSchemaByPath(req.query.path).then(data => {
		for (let i in data['mocks']) {
			data['mocks'][i]['content'] = JSON.stringify(data['mocks'][i]['content'])
		}
		res.send(swig.compileFile(__dirname + '/views/schema.tpl')({
			data: data
		}))
	})
})
app.get('/createSchemaHTML', (req, res) => {
	res.send(swig.compileFile(__dirname + '/views/createSchema.tpl')({}))
})
app.post('/deleteSchema', (req, res) => {
	schema.deleteMySchema(req.body.path)
	mock.deleteMyData(req.body.path)
	res.send('已删除')
})
app.post('/deleteMock', (req, res) => {
	schema.deleteMyMock(req.body.path, req.body.key)
	mock.deleteMyMock(req.body.path, req.body.key)
	res.send('已删除')
})
app.listen(7676, function () {
	_config.autoOpenConfigPath && childProc.exec('open -a "Google Chrome" http://127.0.0.1:7676/index');
})
exports.getConfig = function(config) {
	_config = config
	return module.exports
}
