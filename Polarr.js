/*
#!name=Polarr ✨
#!desc=Polarr ปลดล็อคสิทธิ์ (ต้องเข้าสู่ระบบ)
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Polarr.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https:\/\/api\.polarr\.co\/v1\/payments\/(appleiap\/receipts\/confirmation|profiles\/@me\/subscription) url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/Polarr.js

[mitm]
hostname = api.polarr.co

*/

//🔔 通知模块（含失败日志显示，不干扰原脚本）
(function(){const A="✨📸Polarr✨",M_OK="หมดอายุ: 2099-09-09",M_ERR="❌ ปลดล็อคล้มเหลว",EN=true,CD=10,K="n_"+A.replace(/[^\w]/g,"").toLowerCase()+"_t",P=typeof $prefs!=="undefined",S=typeof $persistentStore!=="undefined";function r(k){try{if(P)return $prefs.valueForKey(k);if(S)return $persistentStore.read(k);}catch(e){}return null}function w(k,v){try{if(P)return $prefs.setValueForKey(String(v),k);if(S)return $persistentStore.write(String(v),k);}catch(e){}}function can(){let t=parseInt(r(K)||"0",10)||0;return CD===0||Date.now()-t>CD*6e4}function mark(){w(K,Date.now())}function send(sub,msg){console.log(`[${A}] ${sub} | ${msg}`);if(!EN)return;try{if(typeof $notify==="function")$notify(A,sub,msg);else if(typeof $notification!=="undefined"&&$notification.post)$notification.post(A,sub,msg);}catch(e){console.log("[NotifyErr]",e)}}try{if($response&&$response.body){if(can()){send("✅ ปลดล็อคสำเร็จ!",M_OK);mark()}else console.log(`[${A}] ⏳ Cooldown(${CD}min)`)}else{send("⚠️ ตรวจไม่พบ $response.body")}}catch(err){send(M_ERR,String(err));console.log(`[${A}] ❌ ${err}`)}})();

// 主脚本函数...
const statusCode = typeof $task !== "undefined" ? "HTTP/1.1 200 OK" : 200;
const response = { status: statusCode, headers: $response.headers };

if ($response.body && $request.url.includes("v1/payments/profiles/@me/subscription")) {
  response.body = JSON.stringify({
    "isSubscribed": true,
    "planId": "co.polarr.ppe.premium.studio.yearly",
    "subscriptionProduct": "yearly",
    "isTrial": false,
    "app": "PPE",
    "isUnlimited": true,
    "expiryDate": "2053-08-17T19:38:37.000Z",
    "planType": "yearly",
    "planTier": "studio",
    "startDate": "2023-08-17T19:38:37.000Z",
    "subscriptionTier": "studio",
    "paymentChannel": "AppleIapSubscription",
    "membershipExpiryDate": "2053-08-17T19:38:37.000Z"
  });
}

if ($response.body && $request.url.includes("v1/payments/appleiap/receipts/confirmation")) {
  response.body = JSON.stringify({
    "app": "PPE",
    "planType": "yearly",
    "planTier": "studio",
    "isUnlimited": true,
    "membershipExpiryDate": "2053-08-17T19:38:37.000Z"
  });
}

$done(response)