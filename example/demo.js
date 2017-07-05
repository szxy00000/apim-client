var express = require('express');
var app = express();
let ac = require('../index.js')

let config = {
	/* rd开发机地址，若配置，则转发到这台机器 */
	// server: 'http://rdliantiao.laixin.otp.baidu.com', 
	
	/* mock平台相关参数配置 */
	host: 'http://cp01-rdqa-dev157-wuhuiyao.epc.baidu.com:8849',
	schemaUrl: '/api/getInterfaceSchemas',
	token: 'd79e5fa60c5ed6111b6a06a2f4fcbb6b',

	/* 是否自动打开本地自定义接口页面。页面地址为 http:127.0.0.1:7676 */
	autoOpenConfigPath: true,

	/*  每次启动是否清空上次缓存到本地的接口数据 */
	clearLocalData: true,

	/* rd开发机cookie */
	cookie: 'BDUSS=HQ5bTBBQUVrTEt5SWFCWEFLaFYyVHRSanp5WVNJbUhvaWxXcFhuTlAtLWFMekpaSVFBQUFBJCQAAAAAAAAAAAEAAADTRAsic3p4eTAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJqiClmaogpZZ; BDCDISKSID=6e0da190cf11a93edf196c95e9e841f3; BAIDUID=C42416CD5AFBCC83BED79B51BF96B9D9:FG=1; PSTM=1495872970; BIDUPSID=E8D67696F7DEE7B5A02D34394159FB6B; BDSFRCVID=Vm_sJeC62rLkDS5Z-Q7dtBWf3m-ipA6TH6aoWi41m0DAIbWX-kimEG0PqM8g0Ku-5VYeogKK0mOTHvbP; H_BDCLCKID_SF=JJ-q_KLXtKvOeJOdbtTJqRIJ-fIX5-RLfacLM-OF5l8-h4osMUO6jqTD0HJb-UjU5J7LsRTM0CQxOKQphpJEj5_DD-OCB4jUyPjWBR6N3KJmqqC9bT3v5Dr03Rr-2-biWbRL2MbdbJombRO4-TFMjT5WeM5; PHPSESSID=ST-5570-Qcfo4xOwUjeJVlzDL5KD-uuap; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; BDRCVFR[dG2JNJb_ajR]=mk3SLVN4HKm; BDRCVFR[-pGxjrCMryR]=mk3SLVN4HKm; PSINO=1; H_PS_PSSID=23211_1449_19036_21083_20718; BDORZ=FFFB88E999055A3F8A630C64834BD6D0; MCITY=-131%3A'
}
ac(config, app)


app.listen(3001, function () {
  	console.log('Example app listening on port 3001!');
});