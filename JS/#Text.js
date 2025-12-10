// 主脚本函数...
var obj = JSON.parse($response.body);
obj.payload.active = true;
$done({
  "body": JSON.stringify(obj)
});
// 主脚本函数...

var body=$response.body.replace(/subscription":\w+/g,'subscription":true');
$done({body});