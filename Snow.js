/*
#!name=SNOW Corporation ✨
#!desc=Unlock All
#!category=🔐APP
#!author=🅚Ⓐ🅦Ⓞ🅐Ⓣ
#!icon=https://raw.githubusercontent.com/KawOat9/icons/main/SNOW_Corp.png
𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹𒊹
[rewrite_local]
^https:\/\/.*\.snow\.me\/v1\/purchase\/subscription\/subscriber\/status$ url script-response-body https://raw.githubusercontent.com/KawOat9/Scripts/main/Snow.js

[mitm]
hostname = *.snow.me

*/

//🔔 通知模块（含失败日志显示，不干扰原脚本）
(function(){const A="✨SNOW Corp.✨",M_OK="หมดอายุ: 2099-09-09",M_ERR="❌ ปลดล็อคล้มเหลว",EN=true,CD=10,K="n_"+A.replace(/[^\w]/g,"").toLowerCase()+"_t",P=typeof $prefs!=="undefined",S=typeof $persistentStore!=="undefined";function r(k){try{if(P)return $prefs.valueForKey(k);if(S)return $persistentStore.read(k);}catch(e){}return null}function w(k,v){try{if(P)return $prefs.setValueForKey(String(v),k);if(S)return $persistentStore.write(String(v),k);}catch(e){}}function can(){let t=parseInt(r(K)||"0",10)||0;return CD===0||Date.now()-t>CD*6e4}function mark(){w(K,Date.now())}function send(sub,msg){console.log(`[${A}] ${sub} | ${msg}`);if(!EN)return;try{if(typeof $notify==="function")$notify(A,sub,msg);else if(typeof $notification!=="undefined"&&$notification.post)$notification.post(A,sub,msg);}catch(e){console.log("[NotifyErr]",e)}}try{if($response&&$response.body){if(can()){send("✅ ปลดล็อคสำเร็จ!",M_OK);mark()}else console.log(`[${A}] ⏳ Cooldown(${CD}min)`)}else{send("⚠️ ตรวจไม่พบ $response.body")}}catch(err){send(M_ERR,String(err));console.log(`[${A}] ❌ ${err}`)}})();

// 主脚本函数...

if ($response.body !== 'undefined') {
  var mgmdev = JSON.parse($response.body);
  const url = $request.url;
  var ids;
  var packageName;

  if (url.indexOf('EPIK') !== -1) {
    ids = "com.snowcorp.epik.subscribe.plan.oneyear";
    packageName = "com.snowcorp.epik";
  } else if (url.indexOf('SNOW') !== -1) {
    ids = "com.campmobile.snow.subscribe.oneyear";
    packageName = "com.snowcorp.snow";
  }

  mgmdev["result"]["products"].forEach(product => {
    product.productId = ids;
  });

  mgmdev["result"]["activated"] = true;

  $done({ body: JSON.stringify(mgmdev) });
}