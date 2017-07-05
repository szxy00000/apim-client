<div class="schema-detail">
	method: {{data.method}}
	<input type="hidden" value="{{data.method}}" id="method">
</div>
<div class="schema-detail">
	path: "{{data.path}}"
	<input type="hidden" value="{{data.path}}" id="path">
</div>
<div class="schema-detail">
	name: {{data.name}}
	<input type="hidden" value="{{data.name}}" id="schema-name">
</div>
<br/>
<div class="annotation">
	<span class="selected">红色</span>字体为当前使用mock，双击切换&nbsp;&nbsp;
	<span class="cur">橙色</span>字体为正在查看mock，单机切换
</div>
<div class="mock-wrap">
	<span id="mock-title">
		{% for key, mock in data.mocks %}
			<span class="title-wrap">
				<a href="javascript:;" id="a-mock-{{key}}" data-from="{{mock.from}}" data-key="{{key}}" {% if mock.choiced %}class="cur selected"{% endif %}>{{key}}({% if mock.from == 'schemaData' %}平台{% else %}本地{% endif %})</a><br/>
				<span>
					{{['','JSON', 'Mock.js', 'function'][parseInt(mock.type)]}}
				</span>
				<input type="hidden" value="{{mock.type}}" id="type-{{key}}">
			</span>
		{% endfor %}
	</span>
	<a href="javascript:;" id="a-mock-成功" {% if data.unChoiced %}class="cur selected"{% endif %}>随机</a>
	<input type="text" id="new-mock" style="display: none;">
	<span class="add-button" id="add-mock">添加</span>&nbsp;
</div>
<div id="mock-data">
	{% for key, mock in data.mocks %}
		<textarea {% if mock.from == 'schemaData' %}readonly="readonly"{% endif %} class="mock-area" id="mock-{{key}}" style="display: none;">{{mock.content}}</textarea>
	{% endfor %}
</div>
<button id="subm">保存修改</button>
<button id="mock-delete">删除mock</button>