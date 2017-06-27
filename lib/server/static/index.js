
$('#search').on('keyup', function(e) {
	let val = e.target.value
	let reg = new RegExp(val.toLowerCase())
	$('.schema-list a').each(function(index, aTag) {
		reg.test($(aTag).text().toLowerCase())? $(aTag).removeClass('hide'): $(aTag).addClass('hide')
	})
})
$('.schema-list').on('click', '.paths', function(e) {
	$('.schema-list a').removeClass('cur')
	$(e.target).addClass('cur')
	$.get('/getSchemaHTML', {path: $(e.target).text()},function(data) {
		$('#schema-content').html(data)
		$('.mock-area').each(function(index, one) {
			var json
			try {
				eval("json=" + $(one).val().replace(/\"/g, ''))
				$(one).val(JSON.stringify(json, null, 4))
			} catch(e) {

			}
		})
		$('.mock-wrap .cur').trigger('click')
	})
})
$('.schema-list').on('click', '.delete', function(e) {
	let path = $(e.target).attr('data-path')
	let ensure = confirm(`确定删除接口${path}?`)
	ensure && $.post('/deleteSchema', {
		path: path
	}, function(data) {
		alert(data)
		location.reload()
	})
})
$('#add-new-schema').on('click', function(e) {
	$.get('/createSchemaHTML', function(data) {
		$('#schema-content').html(data)
	})
})
$('#schema-content').on('click', '.mock-wrap a', function(e) {
	$('.mock-wrap a').removeClass('cur')
	$(e.target).addClass('cur')
	$('.mock-area').fadeOut(0.5).removeClass('show')
	$('#mock-' + $(e.target).attr('data-key')).fadeIn(0.5).addClass('show')
	if($(e.target).attr('data-from') === 'schemaData') {
		$('#subm').hide()
		$('#mock-delete').hide()
	} else {
		$('#subm').show()
		$('#mock-delete').show()
	}
})
$('#schema-content').on('dblclick', '.mock-wrap a', function(e) {
	$.post('/chooseMock', {
		path: $('#path').val(),
		choice: [$(e.target).attr('data-from'), $(e.target).attr('data-key') === '随机'? '': $(e.target).attr('data-key')]
	}, function(data) {
		if(data) {alert(data); return;}
		$('.mock-wrap a').removeClass('selected')
		$(e.target).addClass('selected')
	})
})
var newType
$('#schema-content').on('keyup', '#new-mock', function(e) {
	if (e.keyCode === 13) {
		if (e.target.value !== e.target.value.match(/[a-zA-Z0-9]*/)[0]) {
			alert('请输入字母或数字')
			return
		}
		$('#mock-title').append(`<span class="title-wrap"><a href="javascript:;" id="a-mock-${e.target.value}" data-from="myData" data-key="${e.target.value}">${e.target.value}(本地)</a><br/>
				<span>
					${['','JSON', 'Mock.js', 'function'][newType]}
				</span>
				<input type="hidden" value="${newType}" id="type-${e.target.value}"></span>`)
		$('#mock-data').append('<textarea class="mock-area" id="mock-' + e.target.value + '" style="display: none;"></textarea>')
		$('#a-mock-' + $('#new-mock').val()).trigger('click')
		$('#new-mock').hide().val('')
	}
})
$('#schema-content').on('blur', '#path', function(e) {
	if (e.target.value[0] !== '/') {
		e.target.value = '/' + e.target.value
	}
})
$('#schema-content').on('click', '#add-mock', function() {
	var type = prompt('请选择Mock类型：JSON请输入1，Mock.js请输入2')
	if (type != 1 && type != 2) { alert('请输入1或2'); return}
	newType = type
	$('#mock-data').append(`<input type="hidden" value="${type}" id="type-{{key}}">`)
	$('#new-mock').show().focus();
})
$('#schema-content').on('click', '#mock-delete', function(e) {
	let key = $('#mock-title .cur').attr('data-key')
	let ensure = confirm(`确定删除mock数据${key}?`)
	ensure && $.post('/deleteMock', {
		path: $('#path').val(),
		key: key
	}, function(data) {
		alert(data)
		location.reload()
	})
})
$('#schema-content').on('click', '#subm', function() {
	let key = $('#mock-title .cur').attr('data-key')
	if (!$('#mock-' + key).val()) {
		alert('请填写mock数据')
		return
	}
	if (!$('#path').val()) {
		alert('请填写路径')
		return
	}
	if (!$('#schema-name').val()) {
		alert('请填写name')
		return
	}
	$.post('/setMock', {
		content: JSON.stringify($('#mock-' + key).val().replace(/(\n|\r|\s|\\)/g, '')),
		path: $('#path').val(),
		type: $('#type-' + key).val(),
		key: key,
		'schema-name': $('#schema-name').val(),
		method: $('#method').val()
	}, function(data) {
		alert(data)
		location.reload()
	})
})
