/*
#!name=Windy.com ✨
#!desc=解锁本地VIP
#!category=🔐APP
#!author=KawOat
#!icon=https://raw.githubusercontent.com/KawOat9/Script-Rewrite/main/App-Icon/Windy.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https?:\/\/account\.windy\.com\/api\/info url script-response-body https://raw.githubusercontent.com/KawOat9/Script-Rewrite/main/JS/Windy.com.js

[mitm]
hostname = account.windy.com

*/

//🔔 通知模块（含失败日志显示，不干扰原脚本）
(function(){const A="✨🌤️Windy Premium✨",M_OK="💖ปลดล็อคถาวรสําเร็จแล้ว，เวลาหมดอายุ：2088-08-08",M_ERR="❌ 解锁失败",EN=true,CD=10,K="n_"+A.replace(/[^\w]/g,"").toLowerCase()+"_t",P=typeof $prefs!=="undefined",S=typeof $persistentStore!=="undefined";function r(k){try{if(P)return $prefs.valueForKey(k);if(S)return $persistentStore.read(k);}catch(e){}return null}function w(k,v){try{if(P)return $prefs.setValueForKey(String(v),k);if(S)return $persistentStore.write(String(v),k);}catch(e){}}function can(){let t=parseInt(r(K)||"0",10)||0;return CD===0||Date.now()-t>CD*6e4}function mark(){w(K,Date.now())}function send(sub,msg){console.log(`[${A}] ${sub} | ${msg}`);if(!EN)return;try{if(typeof $notify==="function")$notify(A,sub,msg);else if(typeof $notification!=="undefined"&&$notification.post)$notification.post(A,sub,msg);}catch(e){console.log("[NotifyErr]",e)}}try{if($response&&$response.body){if(can()){send("✅ สำเร็จ",M_OK);mark()}else console.log(`[${A}] ⏳ 冷却中(${CD}min)`)}else{send("⚠️ 可能未命中","没有检测到 $response.body")}}catch(err){send(M_ERR,String(err));console.log(`[${A}] ❌ ${err}`)}})();

// 主脚本函数...

let response = JSON.parse($response.body);

response.subscriptionInfo = {
  status: 'active',
  isTrial: false,
  platform: 'apple',
  tier: 'premium',
  expiresAt: 4094370121000,
  state: 'ok',
  isSubscription: true
};

response.subscription = 'premium';
response.message = 'ok';
response.auth = true;
response.token = '';

$done({ body: JSON.stringify(response) });