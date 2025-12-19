/******************************

脚本功能：XMind思维导图+解锁订阅
下载地址：http://mtw.so/64S2u0
软件版本：3.2.10
脚本作者：彭于晏
更新时间：2022-9-2
问题反馈：QQ+89996462
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️


*******************************

[rewrite_local]

^https:\/\/www\.xmind\.cn\/_res\/devices url script-response-body https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/xmind.js

[mitm] 
hostname = www.xmind.cn


*******************************/
/*
 *Progcessed By JSDec in 0.00s
 *JSDec - JSDec.js.org
 */
var body = $response.body;
var objk = JSON.parse(body);

objk = {"raw_data": "DBcBHgojrvPgruIJMfb4KK/76CmjxSHSp9KipRwOnQUuf+Gt2FncFUzNvxZydUeXEzDZt/XWEm91lHFYrvT0f2AFap2L4psLI/34sKU9VLGH7kFsBYlexU/nifBtosMJqQxL4TU1pjvjl+1uyWsFAeGR42aEnVhQWgvJB5Ovcd0=", "license": {"status": "sub", "expireTime":3070928235000}, "_code": 200}
	

body = JSON.stringify(objk);

$done({body});