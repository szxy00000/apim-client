<div class="schema-detail">
	method: <select id="method">
		<option value="GET">GET</option>
		<option value="POST">POST</option>
	</select>
</div>
<div class="schema-detail">
	path: <input type="text" id="path">
</div>
<div class="schema-detail">
	name: <input type="text" id="schema-name" value="自定义接口">
</div>
<div class="mock-wrap">
	<span id="mock-title">
		
	</span>
	<a href="javascript:;" id="a-mock-成功">随机</a>
	<input type="text" id="new-mock" style="display: none;">
	<span class="add-button" id="add-mock">添加</span>&nbsp;#红色选项为当前使用mock，双击选择切换
</div>
<div id="mock-data">
	
</div>
<button id="subm">保存修改</button>
<button id="mock-delete">删除mock</button>