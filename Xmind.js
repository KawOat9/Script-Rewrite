/******************************

#!name=XMind ✨
#!desc=UnlockVIP
#!category=🔐APP
#!system=ios
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ


*******************************

[rewrite_local]
^https?:\/\/(?:www\.)?xmind\..*\/.+\/(devices|token\/.+) url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/Xmind.js

[mitm]
hostname = *xmind.*

*******************************/
//🔔 通知模块（含失败日志显示，不干扰原脚本）
(function(){const A="✨XMind✨",M_OK="หมดอายุ: 2099-09-09",M_ERR="❌ ปลดล็อคล้มเหลว",EN=true,CD=10,K="n_"+A.replace(/[^\w]/g,"").toLowerCase()+"_t",P=typeof $prefs!=="undefined",S=typeof $persistentStore!=="undefined";function r(k){try{if(P)return $prefs.valueForKey(k);if(S)return $persistentStore.read(k);}catch(e){}return null}function w(k,v){try{if(P)return $prefs.setValueForKey(String(v),k);if(S)return $persistentStore.write(String(v),k);}catch(e){}}function can(){let t=parseInt(r(K)||"0",10)||0;return CD===0||Date.now()-t>CD*6e4}function mark(){w(K,Date.now())}function send(sub,msg){console.log(`[${A}] ${sub} | ${msg}`);if(!EN)return;try{if(typeof $notify==="function")$notify(A,sub,msg);else if(typeof $notification!=="undefined"&&$notification.post)$notification.post(A,sub,msg);}catch(e){console.log("[NotifyErr]",e)}}try{if($response&&$response.body){if(can()){send("✅ ปลดล็อคสำเร็จ!",M_OK);mark()}else console.log(`[${A}] ⏳ Cooldown(${CD}min)`)}else{send("⚠️ ตรวจไม่พบ $response.body")}}catch(err){send(M_ERR,String(err));console.log(`[${A}] ❌ ${err}`)}})();

// 主脚本函数...

var body = $response.body;
var objk = JSON.parse(body);

objk = {"raw_data": "DBcBHgojrvPgruIJMfb4KK/76CmjxSHSp9KipRwOnQUuf+Gt2FncFUzNvxZydUeXEzDZt/XWEm91lHFYrvT0f2AFap2L4psLI/34sKU9VLGH7kFsBYlexU/nifBtosMJqQxL4TU1pjvjl+1uyWsFAeGR42aEnVhQWgvJB5Ovcd0=", "license": {"status": "sub", "expireTime":3070928235000}, "_code": 200}
	

body = JSON.stringify(objk);

$done({body});

/*
var chxm1023 = JSON.parse($response.body);
const vip = /https:\/\/www\.xmind\.cn\/_res\/devices/;
const token = /https:\/\/xmind\.cn\/_res\/token\/.+/;

if (vip.test($request.url)) {
    chxm1023 = {
      "license" : {
        "status" : "sub",
        "expireTime" : 4092599349000
      },
      "_code" : 200,
      "raw_data" : "GfxYgAqnrQ\/ggD9UwqnZyAj6FKnopXzM8s5m3eZLOsmVr4FwCzv41qTmgi\/u72cv+jpaAoljaEPti1twzOS7X7KUPY1KNJ2xalbS7SXbvFHSvs21QXjaUtIOkeJWAl4\/vHl4IvMeHTBVqD8mFCXOmvnBPLRMAJEPgHEJYF1InvQ="};
}

if (token.test($request.url)) {
    chxm1023.expireDate = 4092599349;
    chxm1023.token = "f50633ea8eb04cbb85962b99c47045d7AjOobEGo";
}

$done({body : JSON.stringify(chxm1023)});