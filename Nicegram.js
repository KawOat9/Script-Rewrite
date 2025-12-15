[rewrite_local]
  
# > Nicegram☆解锁会员权限（2024-02-24
^https?:\/\/nicegram\.cloud\/api\/v\d\/(ai-assistant\/purchase-list|user\/info|telegram\/auth) url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/Nicegram.js

[mitm] 

hostname=nicegram.cloud

***********************************/


var body=$response.body.replace(/subscription":\w+/g,'subscription":true');
$done({body});