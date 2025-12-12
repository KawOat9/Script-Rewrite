/*
#!name=Photoroom ✨
#!desc=Photoroom Ultra
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/Photoroom.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/.+$) url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/PhotoroomUltra.js
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/.+$) url script-request-header https://raw.githubusercontent.com/KawOat9/Scripts/main/PhotoroomUltra.js

[mitm] 
hostname = api.revenuecat.com

*/

//🔔 通知模块（含失败日志显示，不干扰原脚本）
(function(){const A="✨🏖️Photoroom Ultra✨",M_OK="💖永久解锁成功，到期时间：2088-08-08",M_ERR="❌ 解锁失败",EN=true,CD=10,K="n_"+A.replace(/[^\w]/g,"").toLowerCase()+"_t",P=typeof $prefs!=="undefined",S=typeof $persistentStore!=="undefined";function r(k){try{if(P)return $prefs.valueForKey(k);if(S)return $persistentStore.read(k);}catch(e){}return null}function w(k,v){try{if(P)return $prefs.setValueForKey(String(v),k);if(S)return $persistentStore.write(String(v),k);}catch(e){}}function can(){let t=parseInt(r(K)||"0",10)||0;return CD===0||Date.now()-t>CD*6e4}function mark(){w(K,Date.now())}function send(sub,msg){console.log(`[${A}] ${sub} | ${msg}`);if(!EN)return;try{if(typeof $notify==="function")$notify(A,sub,msg);else if(typeof $notification!=="undefined"&&$notification.post)$notification.post(A,sub,msg);}catch(e){console.log("[NotifyErr]",e)}}try{if($response&&$response.body){if(can()){send("✅ 成功",M_OK);mark()}else console.log(`[${A}] ⏳ 冷却中(${CD}min)`)}else{send("⚠️ 可能未命中","没有检测到 $response.body")}}catch(err){send(M_ERR,String(err));console.log(`[${A}] ❌ ${err}`)}})();

// 主脚本函数...

/* PhotoRoom Premium Unlock (ULTRA TIER) */
let obj = JSON.parse($response.body);

// 1. ดักจับการเช็ค Subscriptions (API หลัก)
if (obj.subscriptions) {
  obj.subscriptions = [{
    "status": "active",
    "tier": "ultra", // <<< เปลี่ยนเป็น ULTRA
    "expires_date": "2099-08-08T08:08:08.000Z", 
    "is_trial": false,
    "platform": "ios"
  }];
}

// 2. ดักจับการเช็คข้อมูลผู้ใช้ (User Info)
if (obj.user) {
  obj.user.is_pro = true;
  obj.user.is_premium = true;
  obj.user.subscriptions = [{
    "status": "active",
    "tier": "ultra", // <<< เปลี่ยนเป็น ULTRA
    "expires_date": "2099-08-08T08:08:08.000Z",
    "is_trial": false,
    "platform": "ios"
  }];
}

$done({ body: JSON.stringify(obj) });
